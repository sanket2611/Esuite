using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace IM.eSuite.Data.Migrations
{
    public partial class Add_Delegation_Country : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CountryId",
                table: "Plant",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Delegation",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Delegation", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Country",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    DelegationId = table.Column<int>(nullable: false),
                    Name = table.Column<string>(maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Country", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Country_Delegation_DelegationId",
                        column: x => x.DelegationId,
                        principalTable: "Delegation",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Plant_CountryId",
                table: "Plant",
                column: "CountryId");

            migrationBuilder.CreateIndex(
                name: "IX_Country_DelegationId",
                table: "Country",
                column: "DelegationId");

            migrationBuilder.CreateIndex(
                name: "IX_Delegation_Name",
                table: "Delegation",
                column: "Name",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Plant_Country_CountryId",
                table: "Plant",
                column: "CountryId",
                principalTable: "Country",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Plant_Country_CountryId",
                table: "Plant");

            migrationBuilder.DropTable(
                name: "Country");

            migrationBuilder.DropTable(
                name: "Delegation");

            migrationBuilder.DropIndex(
                name: "IX_Plant_CountryId",
                table: "Plant");

            migrationBuilder.DropColumn(
                name: "CountryId",
                table: "Plant");
        }
    }
}
