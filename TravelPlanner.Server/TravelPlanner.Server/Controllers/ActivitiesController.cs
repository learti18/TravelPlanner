using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TravelPlanner.Server.Data;
using TravelPlanner.Server.Dtos;
using TravelPlanner.Server.Models;

namespace TravelPlanner.Server.Controllers
{
    [Route("api/Destinations/{destinationId}/[controller]")]
    [ApiController]
    public class ActivitiesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IWebHostEnvironment _environment;
        private readonly IMapper _mapper;
        public ActivitiesController(ApplicationDbContext context, IWebHostEnvironment environment, IMapper mapper)
        {
            _context = context;
            _environment = environment;
            _mapper = mapper;
        }

        // GET: api/Trips/{tripId}/Activities
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Activity>>> GetActivities(int destinationId)
        {
            var activities = await _context.Activities
                .Where(activity => activity.DestinationId == destinationId)
                .ToListAsync();

            if (activities.Count == 0)
            {
                return NotFound("No activities found for this destination");
            }
            var activitiesDto = _mapper.Map<List<ActivityDto>>(activities);

            return Ok(activitiesDto);
        }

        // GET: api/Trips/{tripId}/Activities/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Activity>> GetActivity(int destinationId, int id)
        {
            var activity = await _context.Activities
                .FirstOrDefaultAsync(a => a.Id == id && a.DestinationId == destinationId);

            if (activity == null)
            {
                return NotFound("Activity not found for this destination");
            }
            var activityDto = _mapper.Map<ActivityDto>(activity);

            return Ok(activityDto);
        }

        // POST: api/Trips/{tripId}/Activities
        [HttpPost]
        public async Task<ActionResult<Activity>> PostActivity(int destinationId, [FromForm] CreateActivityDto activityDto)
        {
            var destination = await _context.Destinations.FindAsync(destinationId);
            if (destination == null) return NotFound("Destination not found");

            var activity = _mapper.Map<Activity>(activityDto);

            if (activityDto.ImageFile != null)
            {
                var imagePath = await SaveImage(activityDto.ImageFile);
                activity.ImageUrl = imagePath;
            }

            activity.DestinationId = destination.Id;
            _context.Activities.Add(activity);
            await _context.SaveChangesAsync();

            var createdActivityDto = _mapper.Map<ActivityDto>(activity);

            return CreatedAtAction(nameof(GetActivity), new { destinationId, id = createdActivityDto.Id }, createdActivityDto);
        }

        // PUT: api/Trips/{tripId}/Activities/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult<ActivityDto>> PutActivity(int destinationId, int id, [FromForm] UpdateActivityDto activityDto)
        {
            if (id != activityDto.Id)
            {
                return BadRequest("Activity id mismatch!");
            }

            var existingActivity = await _context.Activities
                .FirstOrDefaultAsync(a => a.Id == id && a.DestinationId == destinationId);

            if (existingActivity == null)
            {
                return NotFound("Activity not found for this destination!");
            }
            _mapper.Map(activityDto, existingActivity);


            if (activityDto.ImageFile != null)
            {
                var imagePath = await SaveImage(activityDto.ImageFile);
                existingActivity.ImageUrl = imagePath;
            }

            _context.Entry(existingActivity).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
                var updatedActivityDto = _mapper.Map<ActivityDto>(existingActivity);
                return Ok(updatedActivityDto);
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
        }

        // DELETE: api/Trips/{tripId}/Activities/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(int destinationId, int id)
        {
            var activity = await _context.Activities
                .FirstOrDefaultAsync(a => a.Id == id && a.DestinationId == destinationId);

            if (activity == null)
            {
                return NotFound("Activity not found for this destination");
            }

            _context.Activities.Remove(activity);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ActivityExists(int id)
        {
            return _context.Activities.Any(e => e.Id == id);
        }

        private async Task<string> SaveImage(IFormFile imageFile)
        {
            var uploadsFolder = Path.Combine(_environment.WebRootPath, "uploads");
            if (!Directory.Exists(uploadsFolder))
            {
                Directory.CreateDirectory(uploadsFolder);
            }

            var uniqueFileName = Guid.NewGuid().ToString() + Path.GetExtension(imageFile.FileName);
            var filePath = Path.Combine(uploadsFolder, uniqueFileName);

            using (var fileStream = new FileStream(filePath, FileMode.Create))
            {
                await imageFile.CopyToAsync(fileStream);
            }

            return $"/uploads/{uniqueFileName}";
        }
    }
}
