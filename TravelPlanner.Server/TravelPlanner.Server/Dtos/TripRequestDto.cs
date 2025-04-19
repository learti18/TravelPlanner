using System;
using System.Collections.Generic;

namespace TravelPlanner.Server.Models
{
    public class TripRequestDto
    {
        public int HotelId { get; set; }
        public List<int> ActivityIds { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }
}
