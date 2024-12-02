using Microsoft.EntityFrameworkCore;
using TravelPlanner.Server.Models;
using Activity = TravelPlanner.Server.Models.Activity;

namespace TravelPlanner.Server.Data
{
    public class ApplicationDbContext:DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<Trip> Trips { get; set; }
        public DbSet<Activity> Activities { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Activity>()
                .HasOne(a => a.Trip)
                .WithMany(t => t.Activities)
                .HasForeignKey(a => a.TripId);
        }
    }
}
