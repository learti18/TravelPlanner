using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace TravelPlanner.Server.Models
{
    public class Destination
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public required string Description { get; set; }
        public string ImageUrl { get; set; }
        [JsonIgnore]
        public  ICollection<Hotel>?Hotels { get; set; }
        [JsonIgnore]
        public  ICollection<Activity>?Activities { get; set; }
    }
}
