using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TravelPlanner.Server.Data.SeedModels
{
    public class HotelSeedModel
    {
        public int DestinationId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public double Price { get; set; }
        public double Rating { get; set; }
        public string ImageUrl { get; set; } = string.Empty;
    }
}