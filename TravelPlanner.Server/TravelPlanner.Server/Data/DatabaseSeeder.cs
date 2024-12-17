using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Text.Json;
using TravelPlanner.Server.Data.SeedModels;
using TravelPlanner.Server.Models;

namespace TravelPlanner.Server.Data
{
    public class DatabaseSeeder
    {
        private readonly ApplicationDbContext _context;
        private readonly IWebHostEnvironment _env;
        private readonly ILogger<DatabaseSeeder> _logger;

        public DatabaseSeeder(
            ApplicationDbContext context,
            IWebHostEnvironment env,
            ILogger<DatabaseSeeder> logger)
        {
            _context = context;
            _env = env;
            _logger = logger;
        }
        private class ActivityRoot
        {
            public List<ActivitySeedModel> Activities { get; set; } = new();
        }

        private class HotelRoot
        {
            public List<HotelSeedModel> Hotels { get; set; } = new();
        }

        public async Task SeedAsync()
        {
            try
            {
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

        private async Task SeedActivitiesAsync()
        {
            if (_context.Activities.Any())
            {
                _logger.LogInformation("Activities already exist in database");
                return;
            }

            var path = Path.Combine(_env.ContentRootPath, "Data", "SeedData", "activities.json");
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

            if (data?.Activities == null)
            {
                _logger.LogError("No activities found in JSON file");
                return;
            }

            var activities = data.Activities.Select(a => new Activity
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

            var path = Path.Combine(_env.ContentRootPath, "Data", "SeedData", "hotels.json");
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

            if (data?.Hotels == null)
            {
                _logger.LogError("No hotels found in JSON file");
                return;
            }

            var hotels = data.Hotels.Select(h => new Hotel
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