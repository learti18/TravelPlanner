using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TravelPlanner.Server.Models;
using System.Linq;
using System.Threading.Tasks;
using TravelPlanner.Server.Data;

namespace TravelPlanner.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TripsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public TripsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // POST: api/trips
        [HttpPost]
        public async Task<ActionResult<Trip>> CreateTrip([FromBody] TripRequestDto tripRequest)
        {
            if (tripRequest == null)
            {
                return BadRequest("Trip data is required.");
            }

            // Fetch the selected hotel by its ID
            var selectedHotel = await _context.Hotels
                .Where(h => h.Id == tripRequest.HotelId)
                .FirstOrDefaultAsync();

            if (selectedHotel == null)
            {
                return NotFound("Hotel not found.");
            }

            // Fetch the selected activities by their IDs
            var selectedActivities = await _context.Activities
                .Where(a => tripRequest.ActivityIds.Contains(a.Id))
                .ToListAsync();

            if (selectedActivities.Count == 0)
            {
                return NotFound("No activities found.");
            }

            // Create a new Trip based on the data from the DTO
            var trip = new Trip
            {
                StartDate = DateOnly.FromDateTime(tripRequest.StartDate),  // Convert DateTime to DateOnly
                EndDate = DateOnly.FromDateTime(tripRequest.EndDate),      // Convert DateTime to DateOnly
                Cost = selectedHotel.Price, // You can calculate the cost based on hotel and activities if needed
                Hotels = new List<Hotel> { selectedHotel },
                Activities = selectedActivities,
            };

            // Save the new trip to the database
            _context.Trips.Add(trip);
            await _context.SaveChangesAsync();

            // Return the newly created trip
            return CreatedAtAction(nameof(GetTrip), new { id = trip.Id }, trip);
        }

        // GET: api/trips/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Trip>> GetTrip(int id)
        {
            var trip = await _context.Trips
                .Include(t => t.Activities)
                .Include(t => t.Hotels)
                .FirstOrDefaultAsync(t => t.Id == id);

            if (trip == null)
            {
                return NotFound("Trip not found.");
            }

            return trip;
        }
    }
}
