using System.Text.Json.Serialization;

namespace TravelPlanner.Server.Models
{
    public class Activity
    {
        public int Id { get; set; }
        public int DestinationId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Location { get; set; }
        public  TimeOnly Time { get; set; }
        public string ImageUrl { get; set; }
        
        [JsonIgnore]
        public Destination? Destination { get; set; }

    }
}
