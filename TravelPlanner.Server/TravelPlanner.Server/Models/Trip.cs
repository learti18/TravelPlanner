using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TravelPlanner.Server.Models
{
    public class Trip
    {
        [Key]
        public int Id { get; set; }
        public string UserId { get; set; }
        public int DestinationId { get; set; }
        public Destination Destination { get; set; }
        public int HotelId { get; set; }
        public Hotel Hotel { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string TravelType { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public ICollection<TripActivity> TripActivities { get; set; }
    }

    public class TripActivity
    {
        [Key]
        public int Id { get; set; }
        public int TripId { get; set; }
        public Trip Trip { get; set; }
        public int ActivityId { get; set; }
        public Activity Activity { get; set; }
        public int DayNumber { get; set; }
    }
}
