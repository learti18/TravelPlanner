using System.Text.Json.Serialization;

namespace TravelPlanner.Server.Models
{
    public class Activity
    {
        public int Id { get; set; }
        public int TripId { get; set; }
        public string Name { get; set; }
        public string Location { get; set; }
        public  DateTime Time { get; set; }
        public string Description { get; set; }
        
        [JsonIgnore]
        public Trip? Trip { get; set; }

    }
}
