using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using System.Collections.Generic;
using TravelPlanner.Server.Data;
using TravelPlanner.Server.Models;
using Microsoft.Extensions.Logging;

namespace TravelPlanner.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class TripsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<TripsController> _logger;

        public TripsController(ApplicationDbContext context, ILogger<TripsController> logger)
        {
            _context = context;
            _logger = logger;
        }

        public class CreateTripRequest
        {
            public Destination Destination { get; set; }
            public Dictionary<string, List<Activity>> Activities { get; set; }
            public Hotel Hotel { get; set; }
            public DateTime StartDate { get; set; }
            public DateTime EndDate { get; set; }
            public string TravelType { get; set; }
        }

        [HttpPost]
        public async Task<IActionResult> CreateTrip([FromBody] CreateTripRequest request)
        {
            try
            {
                _logger.LogInformation("Creating trip with request: {@Request}", request);

                if (!ModelState.IsValid)
                {
                    _logger.LogWarning("Invalid model state: {@ModelState}", ModelState);
                    return BadRequest(ModelState);
                }

                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                _logger.LogInformation("User ID from token: {UserId}", userId);

                if (string.IsNullOrEmpty(userId))
                {
                    _logger.LogWarning("No user ID found in token");
                    return Unauthorized(new { message = "User ID not found in token" });
                }

                var trip = new Trip
                {
                    UserId = userId,
                    DestinationId = request.Destination.Id,
                    HotelId = request.Hotel.Id,
                    StartDate = request.StartDate,
                    EndDate = request.EndDate,
                    TravelType = request.TravelType,
                    CreatedAt = DateTime.UtcNow,
                    TripActivities = new List<TripActivity>()
                };

                // Add activities for each day
                foreach (var dayActivities in request.Activities)
                {
                    int dayNumber = int.Parse(dayActivities.Key);
                    foreach (var activity in dayActivities.Value)
                    {
                        trip.TripActivities.Add(new TripActivity
                        {
                            ActivityId = activity.Id,
                            DayNumber = dayNumber
                        });
                    }
                }

                _context.Trips.Add(trip);
                await _context.SaveChangesAsync();

                // Load the related data for the response
                await _context.Entry(trip)
                    .Reference(t => t.Destination)
                    .LoadAsync();
                await _context.Entry(trip)
                    .Reference(t => t.Hotel)
                    .LoadAsync();
                await _context.Entry(trip)
                    .Collection(t => t.TripActivities)
                    .Query()
                    .Include(ta => ta.Activity)
                    .LoadAsync();

                var formattedTrip = new
                {
                    trip.Id,
                    trip.Destination,
                    trip.Hotel,
                    trip.StartDate,
                    trip.EndDate,
                    trip.TravelType,
                    Activities = trip.TripActivities
                        .GroupBy(ta => ta.DayNumber)
                        .ToDictionary(
                            g => g.Key.ToString(),
                            g => g.Select(ta => ta.Activity).ToList()
                        )
                };

                _logger.LogInformation("Trip created successfully: {@Trip}", formattedTrip);
                return CreatedAtAction(nameof(GetTrip), new { id = trip.Id }, formattedTrip);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating trip");
                return StatusCode(500, new { message = "An error occurred while creating the trip", error = ex.Message });
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetTrips()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
                return Unauthorized();

            var trips = await _context.Trips
                .Where(t => t.UserId == userId)
                .Include(t => t.Destination)
                .Include(t => t.Hotel)
                .Include(t => t.TripActivities)
                    .ThenInclude(ta => ta.Activity)
                .OrderByDescending(t => t.CreatedAt)
                .ToListAsync();

            // Transform the data to match the frontend expectations
            var formattedTrips = trips.Select(trip => new
            {
                trip.Id,
                trip.Destination,
                trip.Hotel,
                trip.StartDate,
                trip.EndDate,
                trip.TravelType,
                Activities = trip.TripActivities
                    .GroupBy(ta => ta.DayNumber)
                    .ToDictionary(
                        g => g.Key.ToString(),
                        g => g.Select(ta => ta.Activity).ToList()
                    )
            });

            return Ok(formattedTrips);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetTrip(int id)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
                return Unauthorized();

            var trip = await _context.Trips
                .Include(t => t.Destination)
                .Include(t => t.Hotel)
                .Include(t => t.TripActivities)
                    .ThenInclude(ta => ta.Activity)
                .FirstOrDefaultAsync(t => t.Id == id && t.UserId == userId);

            if (trip == null)
                return NotFound();

            var formattedTrip = new
            {
                trip.Id,
                trip.Destination,
                trip.Hotel,
                trip.StartDate,
                trip.EndDate,
                trip.TravelType,
                Activities = trip.TripActivities
                    .GroupBy(ta => ta.DayNumber)
                    .ToDictionary(
                        g => g.Key.ToString(),
                        g => g.Select(ta => ta.Activity).ToList()
                    )
            };

            return Ok(formattedTrip);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTrip(int id)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
                return Unauthorized();

            var trip = await _context.Trips.FirstOrDefaultAsync(t => t.Id == id && t.UserId == userId);
            if (trip == null)
                return NotFound();

            _context.Trips.Remove(trip);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
