using System.Text.Json.Serialization;

namespace TravelPlanner.Server.Models
{
    public class Hotel
    {
        public int Id { get; set; }
        public int DestinationId { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public double Price { get; set; }
        public double Rating { get; set; }
        public string ImageUrl { get; set; }
        [JsonIgnore]
        public Destination? Destination { get; set; }
    }
}
