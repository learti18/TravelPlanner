using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TravelPlanner.Server.Data.SeedModels
{
    public class ActivitySeedModel
    {
        public int DestinationId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Location { get; set; } = string.Empty;
        public TimeOnly Time { get; set; }
        public string ImageUrl { get; set; } = string.Empty;
    }
}