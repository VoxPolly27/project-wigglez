using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Thoughts",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    Context = table.Column<string>(type: "TEXT", nullable: true),
                    Content = table.Column<string>(type: "TEXT", nullable: true),
                    Tags = table.Column<string>(type: "TEXT", nullable: true),
                    Category = table.Column<string>(type: "TEXT", nullable: true),
                    DateRecorded = table.Column<DateTime>(type: "TEXT", nullable: false),
                    DateLastAccessed = table.Column<DateTime>(type: "TEXT", nullable: false),
                    Resolved = table.Column<bool>(type: "INTEGER", nullable: false),
                    Anchored = table.Column<bool>(type: "INTEGER", nullable: false),
                    Desirable = table.Column<bool>(type: "INTEGER", nullable: false),
                    Desirability = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Thoughts", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Thoughts");
        }
    }
}
