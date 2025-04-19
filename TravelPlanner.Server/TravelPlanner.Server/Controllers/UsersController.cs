using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Text.Json;
using TravelPlanner.Server.Data;
using TravelPlanner.Server.Dtos;
using TravelPlanner.Server.Models;

namespace TravelPlanner.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly ApplicationDbContext dbContext;
        private readonly IConfiguration configuration;

        public UsersController(ApplicationDbContext dbContext, IConfiguration configuration)
        {
            this.dbContext = dbContext;
            this.configuration = configuration;
        }

        // Registration endpoint
        [HttpPost]
        [Route("Registration")]
        public async Task<IActionResult> Registration(UserDto userDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var existingUser = await dbContext.Users.FirstOrDefaultAsync(x => x.Email == userDto.Email);
            if (existingUser != null)
            {
                return BadRequest("User already exists with this email.");
            }

            string hashedPassword = BCrypt.Net.BCrypt.HashPassword(userDto.Password);

            // Get the User role
            var userRole = await dbContext.Roles.FirstOrDefaultAsync(r => r.Name == "User");
            if (userRole == null)
            {
                return BadRequest("Default user role not found. Please contact administrator.");
            }

            var newUser = new User
            {
                FirstName = userDto.FirstName,
                LastName = userDto.LastName,
                Email = userDto.Email,
                Password = hashedPassword,
                Roles = new List<Role> { userRole },
                isActive = 1,
                CreatedOn = DateTime.Now
            };

            dbContext.Users.Add(newUser);
            await dbContext.SaveChangesAsync();

            return Ok("User registered successfully.");
        }

        // Login endpoint
        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login(LoginDto loginDto)
        {
            var user = await dbContext.Users
                .Include(u => u.Roles)  // Include roles
                .FirstOrDefaultAsync(x => x.Email == loginDto.Email);

            if (user == null)
            {
                return Unauthorized("Invalid credentials");
            }

            bool isPasswordValid = BCrypt.Net.BCrypt.Verify(loginDto.Password, user.Password);
            if (!isPasswordValid)
            {
                return Unauthorized("Invalid credentials");
            }

            // Create claims including user roles
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.UserId.ToString()),
                new Claim(ClaimTypes.Name, user.Email),
                new Claim(ClaimTypes.Email, user.Email)
            };

            // Add role claims properly for role-based authorization
            foreach (var role in user.Roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role.Name));
            }

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"]));
            var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
                configuration["Jwt:Issuer"],
                configuration["Jwt:Audience"],
                claims,
                expires: DateTime.UtcNow.AddHours(24),
                signingCredentials: signIn);

            return Ok(new
            {
                token = new JwtSecurityTokenHandler().WriteToken(token),
                expiration = token.ValidTo,
                user = new
                {
                    user.UserId,
                    user.Email,
                    user.FirstName,
                    user.LastName,
                    Roles = user.Roles.Select(r => r.Name)
                }
            });
        }

        // Endpoint to get all users - no authorization needed
        [HttpGet]
        [Route("GetUsers")]
        public IActionResult GetUsers()
        {
            return Ok(dbContext.Users.ToList());
        }

        // Protected endpoint to get a specific user by id (requires authentication)
        [Authorize]
        [HttpGet]
        [Route("GetUser")]
        public IActionResult GetUser(int id)
        {
            var user = dbContext.Users.FirstOrDefault(x => x.UserId == id);
            if (user != null)
                return Ok(user);
            else    
                return NoContent();
        }

        // Change password endpoint (requires authentication)
        [Authorize]
        [HttpPost]
        [Route("ChangePassword")]
        public IActionResult ChangePassword(ChangePasswordDto changePasswordDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Get the current user from the JWT claims
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            var user = dbContext.Users.FirstOrDefault(x => x.UserId == userId);

            if (user == null)
            {
                return NotFound("User not found.");
            }

            // Verify the old password
            bool isOldPasswordValid = BCrypt.Net.BCrypt.Verify(changePasswordDto.OldPassword, user.Password);
            if (!isOldPasswordValid)
            {
                return Unauthorized("Old password is incorrect.");
            }

            // Hash the new password before updating it
            string hashedNewPassword = BCrypt.Net.BCrypt.HashPassword(changePasswordDto.NewPassword);

            user.Password = hashedNewPassword;
            dbContext.SaveChanges();

            return Ok("Password updated successfully.");
        }
    }
}
