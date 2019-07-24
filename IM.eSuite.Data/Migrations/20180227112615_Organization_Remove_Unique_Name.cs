using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace IM.eSuite.Data.Migrations
{
    public partial class Organization_Remove_Unique_Name : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Organization_Name",
                table: "Organization");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Organization",
                nullable: false,
                oldClrType: typeof(string));

            migrationBuilder.CreateIndex(
                name: "IX_Plant_GaiaCode",
                table: "Plant",
                column: "GaiaCode",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Plant_GaiaCode",
                table: "Plant");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Organization",
                nullable: false,
                oldClrType: typeof(string));

            migrationBuilder.CreateIndex(
                name: "IX_Organization_Name",
                table: "Organization",
                column: "Name",
                unique: true);
        }
    }
}
