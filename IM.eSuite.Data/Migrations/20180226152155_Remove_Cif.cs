using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace IM.eSuite.Data.Migrations
{
    public partial class Remove_Cif : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Organization_Cif",
                table: "Organization");

            migrationBuilder.DropColumn(
                name: "Cif",
                table: "Organization");

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

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Organization_Name",
                table: "Organization");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Organization",
                nullable: false,
                oldClrType: typeof(string));

            migrationBuilder.AddColumn<string>(
                name: "Cif",
                table: "Organization",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Organization_Cif",
                table: "Organization",
                column: "Cif",
                unique: true,
                filter: "[Cif] IS NOT NULL");
        }
    }
}
