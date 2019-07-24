using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace IM.eSuite.Data.Migrations
{
    public partial class Add_Sector_Bu_Soa : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "SOAId",
                table: "Plant",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Sector",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sector", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "BusinessUnit",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(maxLength: 50, nullable: false),
                    SectorId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BusinessUnit", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BusinessUnit_Sector_SectorId",
                        column: x => x.SectorId,
                        principalTable: "Sector",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SOA",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    BusinessUnitId = table.Column<int>(nullable: false),
                    Name = table.Column<string>(maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SOA", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SOA_BusinessUnit_BusinessUnitId",
                        column: x => x.BusinessUnitId,
                        principalTable: "BusinessUnit",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Plant_SOAId",
                table: "Plant",
                column: "SOAId");

            migrationBuilder.CreateIndex(
                name: "IX_BusinessUnit_SectorId",
                table: "BusinessUnit",
                column: "SectorId");

            migrationBuilder.CreateIndex(
                name: "IX_Sector_Name",
                table: "Sector",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_SOA_BusinessUnitId",
                table: "SOA",
                column: "BusinessUnitId");

            migrationBuilder.AddForeignKey(
                name: "FK_Plant_SOA_SOAId",
                table: "Plant",
                column: "SOAId",
                principalTable: "SOA",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Plant_SOA_SOAId",
                table: "Plant");

            migrationBuilder.DropTable(
                name: "SOA");

            migrationBuilder.DropTable(
                name: "BusinessUnit");

            migrationBuilder.DropTable(
                name: "Sector");

            migrationBuilder.DropIndex(
                name: "IX_Plant_SOAId",
                table: "Plant");

            migrationBuilder.DropColumn(
                name: "SOAId",
                table: "Plant");
        }
    }
}
