using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TravelPlanner.Server.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddTripModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "TripId",
                table: "Hotels",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "TripId",
                table: "Activities",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Hotels_TripId",
                table: "Hotels",
                column: "TripId");

            migrationBuilder.CreateIndex(
                name: "IX_Activities_TripId",
                table: "Activities",
                column: "TripId");

            migrationBuilder.AddForeignKey(
                name: "FK_Activities_Trips_TripId",
                table: "Activities",
                column: "TripId",
                principalTable: "Trips",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Hotels_Trips_TripId",
                table: "Hotels",
                column: "TripId",
                principalTable: "Trips",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Activities_Trips_TripId",
                table: "Activities");

            migrationBuilder.DropForeignKey(
                name: "FK_Hotels_Trips_TripId",
                table: "Hotels");

            migrationBuilder.DropIndex(
                name: "IX_Hotels_TripId",
                table: "Hotels");

            migrationBuilder.DropIndex(
                name: "IX_Activities_TripId",
                table: "Activities");

            migrationBuilder.DropColumn(
                name: "TripId",
                table: "Hotels");

            migrationBuilder.DropColumn(
                name: "TripId",
                table: "Activities");
        }
    }
}
