using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
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
        public IActionResult Registration(UserDto userDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Check if the email is already taken
            var existingUser = dbContext.Users.FirstOrDefault(x => x.Email == userDto.Email);
            if (existingUser != null)
            {
                return BadRequest("User already exists with this email.");
            }

            // Hash the password before saving it to the database
            string hashedPassword = BCrypt.Net.BCrypt.HashPassword(userDto.Password);

            var newUser = new User
            {
                FirstName = userDto.FirstName,
                LastName = userDto.LastName,
                Email = userDto.Email,
                Password = hashedPassword
            };

            dbContext.Users.Add(newUser);
            dbContext.SaveChanges();

            return Ok("User registered successfully.");
        }

        // Login endpoint
        [HttpPost]
        [Route("Login")]
        public IActionResult Login(LoginDto loginDto)
        {
            var user = dbContext.Users.FirstOrDefault(x => x.Email == loginDto.Email);
            if (user == null)
            {
                return Unauthorized("Invalid credentials");
            }

            // Verify the hashed password
            bool isPasswordValid = BCrypt.Net.BCrypt.Verify(loginDto.Password, user.Password);
            if (!isPasswordValid)
            {
                // Check if bcrypt hash uses old salt version (e.g., $2a$)
                if (user.Password.StartsWith("$2a$"))
                {
                    // Rehash the password with the correct version
                    user.Password = BCrypt.Net.BCrypt.HashPassword(loginDto.Password);
                    dbContext.SaveChanges(); // Save the new password hash
                }
                return Unauthorized("Invalid credentials");
            }

            // If credentials are valid, create JWT token
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, configuration["Jwt:Subject"]),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim("UserId", user.UserId.ToString()),
                new Claim("Email", user.Email)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"]));
            var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
                configuration["Jwt:Issuer"],
                configuration["Jwt:Audience"],
                claims,
                expires: DateTime.UtcNow.AddMinutes(60),
                signingCredentials: signIn
            );
            string tokenValue = new JwtSecurityTokenHandler().WriteToken(token);

            return Ok(new { Token = tokenValue, User = user });
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
            var userId = int.Parse(User.FindFirst("UserId").Value);
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
