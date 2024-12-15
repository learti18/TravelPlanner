using System.Diagnostics;

namespace TravelPlanner.Server.Models
{
    public class Trip
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Destination { get; set; }
        public DateOnly StartDate { get; set; }
        public DateOnly EndDate { get; set; }
        public double Cost { get; set; }
    }
}
