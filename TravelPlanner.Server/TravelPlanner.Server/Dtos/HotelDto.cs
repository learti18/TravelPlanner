using System.ComponentModel.DataAnnotations;
using TravelPlanner.Server.Models;

namespace TravelPlanner.Server.Dtos
{
    public class HotelDto
    {
        public int Id { get; set; }
        public int DestinationId { get; set; }
        public string? Name { get; set; }
        public string? Address { get; set; }
        public double Price { get; set; }
        public double Rating { get; set; }
        public string? ImageUrl { get; set; }
    }
    public class CreateHotelDto
    {

        [Required(ErrorMessage = "DestinationId is required.")]
        public int DestinationId { get; set; }

        [Required(ErrorMessage = "Name is required.")]
        [MaxLength(150, ErrorMessage = "Name cannot exceed 150 characters.")]
        [MinLength(2, ErrorMessage = "Name must be at least 2 characters.")]
        public string? Name { get; set; }

        [Required(ErrorMessage = "Address is required.")]
        [MaxLength(250, ErrorMessage = "Address cannot exceed 250 characters.")]
        public string? Address { get; set; }

        [Required(ErrorMessage = "Price is required.")]
        [Range(0, double.MaxValue, ErrorMessage = "Price must be a positive value.")]
        public double Price { get; set; }

        [Required(ErrorMessage = "Rating is required.")]
        [Range(0, 5, ErrorMessage = "Rating must be between 0 and 5.")]
        public double Rating { get; set; }

        public IFormFile? ImageFile { get; set; }
    }
    public class UpdateeHotelDto
    {
        public required int Id { get; set; }

        [Required(ErrorMessage = "DestinationId is required.")]
        public int DestinationId { get; set; }

        [Required(ErrorMessage = "Name is required.")]
        [MaxLength(150, ErrorMessage = "Name cannot exceed 150 characters.")]
        [MinLength(2, ErrorMessage = "Name must be at least 2 characters.")]
        public string? Name { get; set; }

        [Required(ErrorMessage = "Address is required.")]
        [MaxLength(250, ErrorMessage = "Address cannot exceed 250 characters.")]
        public string? Address { get; set; }

        [Required(ErrorMessage = "Price is required.")]
        [Range(0, double.MaxValue, ErrorMessage = "Price must be a positive value.")]
        public double Price { get; set; }

        [Required(ErrorMessage = "Rating is required.")]
        [Range(0, 5, ErrorMessage = "Rating must be between 0 and 5.")]
        public double Rating { get; set; }

        public IFormFile? ImageFile { get; set; }
    }
}
