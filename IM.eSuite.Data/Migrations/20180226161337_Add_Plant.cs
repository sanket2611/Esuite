using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace IM.eSuite.Data.Migrations
{
    public partial class Add_Plant : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "PlantId",
                table: "Organization",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Plant",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    GaiaCode = table.Column<string>(maxLength: 6, nullable: false),
                    IsDeleted = table.Column<bool>(nullable: false),
                    Name = table.Column<string>(maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Plant", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Organization_PlantId",
                table: "Organization",
                column: "PlantId");

            migrationBuilder.AddForeignKey(
                name: "FK_Organization_Plant_PlantId",
                table: "Organization",
                column: "PlantId",
                principalTable: "Plant",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Organization_Plant_PlantId",
                table: "Organization");

            migrationBuilder.DropTable(
                name: "Plant");

            migrationBuilder.DropIndex(
                name: "IX_Organization_PlantId",
                table: "Organization");

            migrationBuilder.DropColumn(
                name: "PlantId",
                table: "Organization");
        }
    }
}
