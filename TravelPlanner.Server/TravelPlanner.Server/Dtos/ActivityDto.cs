using System.ComponentModel.DataAnnotations;
using TravelPlanner.Server.Models;

namespace TravelPlanner.Server.Dtos
{
    public class ActivityDto
    {
        public int Id { get; set; }
        public int DestinationId { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public string? Location { get; set; }
        public TimeOnly Time { get; set; }
        public string? ImageUrl { get; set; }

    }
    public class CreateActivityDto
    {
        public int DestinationId { get; set; }

        [Required(ErrorMessage = "Name is required.")]
        [MaxLength(100, ErrorMessage = "Name cannot exceed 100 characters.")]
        [MinLength(2, ErrorMessage = "Name must be at least 2 characters.")]
        public string? Name { get; set; }

        [Required(ErrorMessage = "Description is required.")]
        [MaxLength(500, ErrorMessage = "Description cannot exceed 500 characters.")]
        public string? Description { get; set; }

        [Required(ErrorMessage = "Location is required.")]
        [MaxLength(200, ErrorMessage = "Location cannot exceed 200 characters.")]
        public string? Location { get; set; }

        [Required(ErrorMessage = "Time is required.")]
        public TimeOnly Time { get; set; }
        
        public IFormFile? ImageFile { get; set; }

    }
    public class UpdateActivityDto
    {
        public required int Id { get; set; }
        public int DestinationId { get; set; }

        [Required(ErrorMessage = "Name is required.")]
        [MaxLength(100, ErrorMessage = "Name cannot exceed 100 characters.")]
        [MinLength(2, ErrorMessage = "Name must be at least 2 characters.")]
        public string? Name { get; set; }

        [Required(ErrorMessage = "Description is required.")]
        [MaxLength(500, ErrorMessage = "Description cannot exceed 500 characters.")]
        public string? Description { get; set; }

        [Required(ErrorMessage = "Location is required.")]
        [MaxLength(200, ErrorMessage = "Location cannot exceed 200 characters.")]
        public string? Location { get; set; }

        [Required(ErrorMessage = "Time is required.")]
        public TimeOnly Time { get; set; }

        public IFormFile? ImageFile { get; set; }

    }
}
