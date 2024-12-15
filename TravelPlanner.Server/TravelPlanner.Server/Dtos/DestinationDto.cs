using System.ComponentModel.DataAnnotations;

namespace TravelPlanner.Server.Dtos
{
    public class DestinationDto
    {
        public int Id { get; set; }

        public string? Name { get; set; }
        public string? Description { get; set; }
        public string? ImageUrl { get; set; }
        public List<HotelDto>? Hotels { get; set; }
        public List<ActivityDto>? Activities { get; set; }

    }
    public class CreateDestinationDto
    {
        [Required(ErrorMessage = "Name is required.")]
        [MaxLength(100, ErrorMessage = "Name cannot exceed 100 characters.")]
        public string? Name { get; set; }

        [Required(ErrorMessage = "Description is required.")]
        [MaxLength(500, ErrorMessage = "Description cannot exceed 500 characters.")]
        public string? Description { get; set; }

        public IFormFile? ImageFile { get; set; }

    }
}
