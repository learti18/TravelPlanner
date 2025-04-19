using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Text.Json;
using TravelPlanner.Server.Data.SeedModels;
using TravelPlanner.Server.Models;
using Microsoft.EntityFrameworkCore;
using BCrypt.Net;

namespace TravelPlanner.Server.Data
{
    public class DatabaseSeeder
    {
        private readonly ApplicationDbContext _context;
        private readonly IWebHostEnvironment _environment;
        private readonly ILogger<DatabaseSeeder> _logger;

        public DatabaseSeeder(
            ApplicationDbContext context,
            IWebHostEnvironment environment,
            ILogger<DatabaseSeeder> logger)
        {
            _context = context;
            _environment = environment;
            _logger = logger;
        }
        private class ActivityRoot
        {
            public List<ActivitySeedModel> activities { get; set; } = new();
        }

        private class HotelRoot
        {
            public List<HotelSeedModel> hotels { get; set; } = new();
        }

        private class UsersRoot
        {
            public List<UserSeedModel> Users { get; set; } = new();
        }

        public async Task SeedAsync()
        {
            try
            {
                await SeedRolesAsync();
                await SeedUsersAsync();
                
                // First check if destinations exist
                if (!_context.Destinations.Any())
                {
                    _logger.LogError("No destinations found in database. Please seed destinations first.");
                    return;
                }

                await SeedActivitiesAsync();
                await SeedHotelsAsync();
                await _context.SaveChangesAsync();
                _logger.LogInformation("Database seeding completed successfully");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while seeding the database");
                throw;
            }
        }

        private async Task SeedUsersAsync()
        {
            if (_context.Users.Any())
            {
                _logger.LogInformation("Users already exist in database");
                return;
            }

            var usersData = await File.ReadAllTextAsync(Path.Combine(_environment.ContentRootPath, "Data", "SeedData", "users.json"));
            var options = new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            };
            var usersRoot = JsonSerializer.Deserialize<UsersRoot>(usersData, options);

            foreach (var userDto in usersRoot.Users)
            {
                if (string.IsNullOrEmpty(userDto.Password))
                {
                    _logger.LogError($"Password is null or empty for user {userDto.Email}");
                    continue;
                }

                var user = new User
                {
                    FirstName = userDto.FirstName,
                    LastName = userDto.LastName,
                    Email = userDto.Email,
                    Password = BCrypt.Net.BCrypt.HashPassword(userDto.Password),
                    isActive = 1,
                    CreatedOn = DateTime.Now
                };

                // Get roles for the user
                var roles = await _context.Roles
                    .Where(r => userDto.Roles.Contains(r.Name))
                    .ToListAsync();

                user.Roles = roles;
                await _context.Users.AddAsync(user);
            }

            await _context.SaveChangesAsync();
            _logger.LogInformation("Users seeded successfully");
        }

        private async Task SeedRolesAsync()
        {
            if (_context.Roles.Any())
            {
                _logger.LogInformation("Roles already exist in database");
                return;
            }

            var roles = new List<Role>
            {
                new Role { Name = "Admin", Description = "Administrator with full access" },
                new Role { Name = "User", Description = "Regular user with limited access" }
            };

            await _context.Roles.AddRangeAsync(roles);
            await _context.SaveChangesAsync();
            _logger.LogInformation($"Added {roles.Count} roles");
        }

        private async Task SeedActivitiesAsync()
        {
            if (_context.Activities.Any())
            {
                _logger.LogInformation("Activities already exist in database");
                return;
            }

            var path = Path.Combine(_environment.ContentRootPath, "Data", "SeedData", "activities.json");
            _logger.LogInformation($"Reading activities from: {path}");

            if (!File.Exists(path))
            {
                _logger.LogError($"Activities file not found at: {path}");
                return;
            }

            var json = await File.ReadAllTextAsync(path);
            var options = new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            };
            var data = JsonSerializer.Deserialize<ActivityRoot>(json, options);

            if (data?.activities == null)
            {
                _logger.LogError("No activities found in JSON file");
                return;
            }

            // Verify destination IDs exist
            var destinationIds = data.activities.Select(a => a.DestinationId).Distinct();
            var existingDestinationIds = await _context.Destinations
                .Where(d => destinationIds.Contains(d.Id))
                .Select(d => d.Id)
                .ToListAsync();

            var activities = data.activities
                .Where(a => existingDestinationIds.Contains(a.DestinationId))
                .Select(a => new Activity
                {
                    DestinationId = a.DestinationId,
                    Name = a.Name,
                    Description = a.Description,
                    Location = a.Location,
                    Time = TimeOnly.Parse(a.Time.ToString()),
                    ImageUrl = a.ImageUrl
                });

            await _context.Activities.AddRangeAsync(activities);
            _logger.LogInformation($"Added {activities.Count()} activities");
        }

        private async Task SeedHotelsAsync()
        {
            if (_context.Hotels.Any())
            {
                _logger.LogInformation("Hotels already exist in database");
                return;
            }

            var path = Path.Combine(_environment.ContentRootPath, "Data", "SeedData", "hotels.json");
            _logger.LogInformation($"Reading hotels from: {path}");

            if (!File.Exists(path))
            {
                _logger.LogError($"Hotels file not found at: {path}");
                return;
            }

            var json = await File.ReadAllTextAsync(path);
            var options = new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            };
            var data = JsonSerializer.Deserialize<HotelRoot>(json, options);

            if (data?.hotels == null)
            {
                _logger.LogError("No hotels found in JSON file");
                return;
            }

            // Verify destination IDs exist
            var destinationIds = data.hotels.Select(h => h.DestinationId).Distinct();
            var existingDestinationIds = await _context.Destinations
                .Where(d => destinationIds.Contains(d.Id))
                .Select(d => d.Id)
                .ToListAsync();

            var hotels = data.hotels
                .Where(h => existingDestinationIds.Contains(h.DestinationId))
                .Select(h => new Hotel
                {
                    DestinationId = h.DestinationId,
                    Name = h.Name,
                    Address = h.Address,
                    Price = h.Price,
                    Rating = h.Rating,
                    ImageUrl = h.ImageUrl
                });

            await _context.Hotels.AddRangeAsync(hotels);
            _logger.LogInformation($"Added {hotels.Count()} hotels");
        }
    }
}