using System;
using System.Collections.Generic;
using System.Diagnostics;
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
    public class HotelsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IWebHostEnvironment _environment;
        private readonly IMapper _mapper;
        public HotelsController(ApplicationDbContext context, IWebHostEnvironment environment, IMapper mapper)
        {
            _context = context;
            _environment = environment;
            _mapper = mapper;
        }

        // GET: api/Destination/{destinationId}/Hotels
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Hotel>>> GetHotels(int destinationId)
        {
            var hotels = await _context.Hotels
                .Where(h => h.DestinationId == destinationId)
                .ToListAsync();

            if (hotels.Count == 0) 
            {
                return NotFound("No hotels found for this destination");
            }
            var hotelsDto = _mapper.Map<List<HotelDto>>(hotels);

            return Ok(hotelsDto);
        }

        // GET: api/Destination/{destinationId}/Hotels/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Hotel>> GetHotel(int id,int destinationId)
        {
            var hotel = await _context.Hotels
                .SingleOrDefaultAsync(h => h.DestinationId == destinationId && h.Id == id);

            if (hotel == null)
            {
                return NotFound("Hotel not found for this destination");
            }
            var hotelDto = _mapper.Map<HotelDto>(hotel);

            return Ok(hotelDto);
        }

        // PUT: api/Destination/{destinationId}/Hotels/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutHotel(int id,int destinationId,[FromForm] UpdateActivityDto hotelDto)
        {

            if (id != hotelDto.Id)
            {
                return BadRequest("Hotel id mismatch");
            }

            var existingHotel = await _context.Hotels
                    .FirstOrDefaultAsync(h => h.DestinationId == destinationId && id == h.Id);
            if (existingHotel == null) 
            {
                return NotFound("Hotel not found for this destination");
            }

            _mapper.Map(hotelDto, existingHotel);

            if (hotelDto.ImageFile != null) 
            {
                var imagePath = await SaveImage(hotelDto.ImageFile);
                existingHotel.ImageUrl = imagePath;
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!HotelExists(id))
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

        // POST: api/Destination/{destinationId}/Hotels
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Hotel>> PostHotel(int destinationId,[FromForm] CreateHotelDto hotelDto)
        {
            var destination = await _context.Destinations.FindAsync(destinationId);
            
            if(destination == null) { 
                return NotFound("Destination notFound"); 
            }

            var hotel = _mapper.Map<Hotel>(hotelDto);

            if(hotelDto.ImageFile != null)
            {
                var imagePath = await SaveImage(hotelDto.ImageFile);
                hotel.ImageUrl = imagePath;
            }

            hotel.DestinationId = destinationId;
            _context.Hotels.Add(hotel);
            await _context.SaveChangesAsync();

            var createdHotelDto = _mapper.Map<HotelDto>(hotel);

            return CreatedAtAction(nameof(GetHotel), new { destinationId, id = createdHotelDto.Id }, createdHotelDto);
        }

        // DELETE: api/Destination/{destinationId}/Hotels/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteHotel(int id,int destinationId)
        {
            var hotel = await _context.Hotels
                .FirstOrDefaultAsync(h => destinationId == h.DestinationId && h.Id == id);
            if (hotel == null)
            {
                return NotFound("Hotel not found for this destination!");
            }

            _context.Hotels.Remove(hotel);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool HotelExists(int id)
        {
            return _context.Hotels.Any(e => e.Id == id);
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
