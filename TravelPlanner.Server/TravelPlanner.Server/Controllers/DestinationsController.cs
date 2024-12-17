using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using TravelPlanner.Server.Data;
using TravelPlanner.Server.Dtos;
using TravelPlanner.Server.Models;

namespace TravelPlanner.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DestinationsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IWebHostEnvironment _environment;
        private readonly IMapper _mapper;
        public DestinationsController(ApplicationDbContext context, IWebHostEnvironment environment,IMapper mapper)
        {
            _context = context;
            _environment = environment;
            _mapper = mapper;
        }

        // GET: api/Destinations
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Destination>>> GetDestinations()
        {
            var destinations = await _context.Destinations
                    .Include(d => d.Activities)
                    .Include(d => d.Hotels)
                    .ToListAsync();

            var destinationsDto = _mapper.Map<List<DestinationDto>>(destinations);
            
            return Ok(destinationsDto);
        }

        // GET: api/Destinations/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Destination>> GetDestination(int id)
        {
            var destination = await _context.Destinations
                .Include(d => d.Activities)
                .Include (d => d.Hotels)
                .SingleOrDefaultAsync(d => d.Id == id);

            if (destination == null)
            {
                return NotFound();
            }
            var destinationDto = _mapper.Map<DestinationDto>(destination);

            return Ok(destinationDto);
        }

        // PUT: api/Destinations/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> PutDestination(int id, [FromForm] CreateDestinationDto destinationDTO)
        {
            var existingDestination = await _context.Destinations.FindAsync(id);
            if (existingDestination == null)
            {
                return NotFound("Destination doesn't exist");
            }

            _mapper.Map(destinationDTO, existingDestination);

            if (destinationDTO.ImageFile != null)
            {
                var imagePath = await SaveImage(destinationDTO.ImageFile);
                existingDestination.ImageUrl = imagePath;
            }

            _context.Entry(existingDestination).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // POST: api/Destinations
        [HttpPost]
        [Consumes("multipart/form-data")]
        public async Task<ActionResult<Destination>> PostDestination([FromForm] CreateDestinationDto destinationDTO)
        {
            var destination = _mapper.Map<Destination>(destinationDTO);

            if (destinationDTO.ImageFile != null)
            {
                var imagePath = await SaveImage(destinationDTO.ImageFile);
                destination.ImageUrl = imagePath;
            }

            _context.Destinations.Add(destination);
            await _context.SaveChangesAsync();

            var createdDestinationDto = _mapper.Map<DestinationDto>(destination);

            return CreatedAtAction("GetDestination", new { id = destination.Id }, createdDestinationDto);
        }

        // DELETE: api/Destinations/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDestination(int id)
        {
            var destination = await _context.Destinations.FindAsync(id);
            if (destination == null)
            {
                return NotFound();
            }

            _context.Destinations.Remove(destination);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool DestinationExists(int id)
        {
            return _context.Destinations.Any(e => e.Id == id);
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
