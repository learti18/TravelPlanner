using Microsoft.EntityFrameworkCore;
using TravelPlanner.Server.Models;
using Activity = TravelPlanner.Server.Models.Activity;

namespace TravelPlanner.Server.Data
{
    public class ApplicationDbContext:DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<Destination> Destinations { get; set; }
        public DbSet<Trip> Trips { get; set; }
        public DbSet<Activity> Activities { get; set; }
        public DbSet<Hotel> Hotels { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Activity>()
                .HasOne(a => a.Destination)
                .WithMany(d => d.Activities)
                .HasForeignKey(a => a.DestinationId);

            modelBuilder.Entity<Hotel>()
                .HasOne(h => h.Destination)
                .WithMany(d => d.Hotels)
                .HasForeignKey(h => h.DestinationId);
        }
    }
}
