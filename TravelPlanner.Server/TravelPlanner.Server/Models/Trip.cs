using System.Diagnostics;

namespace TravelPlanner.Server.Models
{
    public class Trip
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Destination { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public double Cost { get; set; }
        public ICollection<Activity>? Activities { get; set; }
    }
}
