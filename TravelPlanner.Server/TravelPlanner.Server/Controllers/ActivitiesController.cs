using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TravelPlanner.Server.Data;
using TravelPlanner.Server.Models;

namespace TravelPlanner.Server.Controllers
{
    [Route("api/Trips/{tripId}/[controller]")]
    [ApiController]
    public class ActivitiesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ActivitiesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Trips{id}/Activities/
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Activity>>> GetActivities(int tripId)
        {
            var activities = await _context.Activities
                    .Where(activity => activity.TripId == tripId)
                    .ToListAsync();

            if (activities.Count == 0)
            {
                return NotFound("No activities found for this trip");
            }

            return Ok(activities);
        }

        // GET: api/Trips{id}/Activities/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Activity>> GetActivity(int tripId,int id)
        {
            var activity = await _context.Activities
                    .FirstOrDefaultAsync(a=> a.Id == id && a.TripId == tripId);
                         
            if (activity == null)
            {
                return NotFound("Activity not found for this trip");
            }

            return Ok(activity);
        }

        // PUT: api/Trips{id}/Activities/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutActivity(int tripId,int id, Activity activity)
        {
            if (id != activity.Id)
            {
                return BadRequest("Activity id mismatch!");
            }

            var existingActivity = await _context.Activities
                    .FirstOrDefaultAsync(a => a.Id == id && a.TripId == tripId);

            if (existingActivity == null)
            {
                return NotFound("Activity not found for this trip!");
            }

            existingActivity.Name = activity.Name;
            existingActivity.Location = activity.Location;
            existingActivity.Time = activity.Time;
            existingActivity.Description = activity.Description;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ActivityExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Trips{id}/Activities
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Activity>> PostActivity(int tripId,Activity activity)
        {
            var trip = await _context.Trips.FindAsync(tripId);
            if (trip == null) return NotFound("Trip not found");

            activity.TripId = trip.Id;
            _context.Activities.Add(activity);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetActivity), new { tripId = tripId, id = activity.Id }, activity);
        }

        // DELETE: api/Trips{id}/Activities/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(int tripId,int id)
        {
            var activity = await _context.Activities
                    .FirstOrDefaultAsync(a => a.Id == id && a.TripId == tripId);

            if (activity == null)
            {
                return NotFound("Activity not found for this trip");
            }

            _context.Activities.Remove(activity);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ActivityExists(int id)
        {
            return _context.Activities.Any(e => e.Id == id);
        }
    }
}
