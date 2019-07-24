﻿// <auto-generated />
using IM.eSuite.Data;
using IM.eSuite.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.EntityFrameworkCore.Storage.Internal;
using System;

namespace IM.eSuite.Data.Migrations
{
    [DbContext(typeof(eSuiteDbContext))]
    [Migration("20180306111738_Add_User_Plant")]
    partial class Add_User_Plant
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.0.1-rtm-125")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("IM.eSuite.Domain.Application", b =>
                {
                    b.Property<int>("Id");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(50);

                    b.HasKey("Id");

                    b.ToTable("Application");
                });

            modelBuilder.Entity("IM.eSuite.Domain.ApplicationUserGroup", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("ApplicationId");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(50);

                    b.HasKey("Id");

                    b.HasIndex("ApplicationId");

                    b.ToTable("ApplicationUserGroup");
                });

            modelBuilder.Entity("IM.eSuite.Domain.ApplicationUserGroupRole", b =>
                {
                    b.Property<int>("ApplicationUserGroupId");

                    b.Property<int>("RoleId");

                    b.HasKey("ApplicationUserGroupId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("ApplicationUserGroupRole");
                });

            modelBuilder.Entity("IM.eSuite.Domain.BusinessUnit", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(50);

                    b.Property<int>("SectorId");

                    b.HasKey("Id");

                    b.HasIndex("SectorId");

                    b.ToTable("BusinessUnit");
                });

            modelBuilder.Entity("IM.eSuite.Domain.Country", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("DelegationId");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(50);

                    b.HasKey("Id");

                    b.HasIndex("DelegationId");

                    b.ToTable("Country");
                });

            modelBuilder.Entity("IM.eSuite.Domain.Delegation", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(50);

                    b.HasKey("Id");

                    b.HasIndex("Name")
                        .IsUnique();

                    b.ToTable("Delegation");
                });

            modelBuilder.Entity("IM.eSuite.Domain.Organization", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<bool>("IsDeleted");

                    b.Property<string>("Name")
                        .IsRequired();

                    b.Property<int?>("ParentId");

                    b.Property<int?>("PlantId");

                    b.Property<int>("Type");

                    b.HasKey("Id");

                    b.HasIndex("ParentId");

                    b.HasIndex("PlantId");

                    b.ToTable("Organization");
                });

            modelBuilder.Entity("IM.eSuite.Domain.Plant", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("CountryId");

                    b.Property<string>("GaiaCode")
                        .IsRequired()
                        .HasMaxLength(6);

                    b.Property<bool>("IsDeleted");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(50);

                    b.Property<int>("SOAId");

                    b.HasKey("Id");

                    b.HasIndex("CountryId");

                    b.HasIndex("GaiaCode")
                        .IsUnique();

                    b.HasIndex("SOAId");

                    b.ToTable("Plant");
                });

            modelBuilder.Entity("IM.eSuite.Domain.Role", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(50);

                    b.HasKey("Id");

                    b.ToTable("Role");
                });

            modelBuilder.Entity("IM.eSuite.Domain.Sector", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(50);

                    b.HasKey("Id");

                    b.HasIndex("Name")
                        .IsUnique();

                    b.ToTable("Sector");
                });

            modelBuilder.Entity("IM.eSuite.Domain.SOA", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("BusinessUnitId");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(50);

                    b.HasKey("Id");

                    b.HasIndex("BusinessUnitId");

                    b.ToTable("SOA");
                });

            modelBuilder.Entity("IM.eSuite.Domain.Token", b =>
                {
                    b.Property<int>("UserId");

                    b.Property<DateTime>("ExpirationDate");

                    b.Property<string>("Value")
                        .IsRequired()
                        .HasMaxLength(50);

                    b.HasKey("UserId");

                    b.ToTable("Token");
                });

            modelBuilder.Entity("IM.eSuite.Domain.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasMaxLength(200);

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasMaxLength(50);

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasMaxLength(50);

                    b.Property<string>("UserName")
                        .IsRequired()
                        .HasMaxLength(50);

                    b.HasKey("Id");

                    b.ToTable("User");
                });

            modelBuilder.Entity("IM.eSuite.Domain.UserGroupUser", b =>
                {
                    b.Property<int>("UserId");

                    b.Property<int>("ApplicationUserGroupId");

                    b.HasKey("UserId", "ApplicationUserGroupId");

                    b.HasIndex("ApplicationUserGroupId");

                    b.ToTable("UserGroupUser");
                });

            modelBuilder.Entity("IM.eSuite.Domain.UserPlant", b =>
                {
                    b.Property<int>("UserId");

                    b.Property<int>("PlantId");

                    b.HasKey("UserId", "PlantId");

                    b.HasIndex("PlantId");

                    b.ToTable("UserPlant");
                });

            modelBuilder.Entity("IM.eSuite.Domain.ApplicationUserGroup", b =>
                {
                    b.HasOne("IM.eSuite.Domain.Application", "Application")
                        .WithMany("UserGroups")
                        .HasForeignKey("ApplicationId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("IM.eSuite.Domain.ApplicationUserGroupRole", b =>
                {
                    b.HasOne("IM.eSuite.Domain.ApplicationUserGroup", "ApplicationUserGroup")
                        .WithMany("UserGroupRoles")
                        .HasForeignKey("ApplicationUserGroupId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("IM.eSuite.Domain.Role", "Role")
                        .WithMany("ApplicationUserGroupRoles")
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("IM.eSuite.Domain.BusinessUnit", b =>
                {
                    b.HasOne("IM.eSuite.Domain.Sector", "Sector")
                        .WithMany("BusinessUnits")
                        .HasForeignKey("SectorId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("IM.eSuite.Domain.Country", b =>
                {
                    b.HasOne("IM.eSuite.Domain.Delegation", "Delegation")
                        .WithMany("Countries")
                        .HasForeignKey("DelegationId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("IM.eSuite.Domain.Organization", b =>
                {
                    b.HasOne("IM.eSuite.Domain.Organization", "Parent")
                        .WithMany("SubOrganizations")
                        .HasForeignKey("ParentId");

                    b.HasOne("IM.eSuite.Domain.Plant", "Plant")
                        .WithMany("Departments")
                        .HasForeignKey("PlantId");
                });

            modelBuilder.Entity("IM.eSuite.Domain.Plant", b =>
                {
                    b.HasOne("IM.eSuite.Domain.Country", "Country")
                        .WithMany("Plants")
                        .HasForeignKey("CountryId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("IM.eSuite.Domain.SOA", "SOA")
                        .WithMany("Plants")
                        .HasForeignKey("SOAId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("IM.eSuite.Domain.SOA", b =>
                {
                    b.HasOne("IM.eSuite.Domain.BusinessUnit", "BusinessUnit")
                        .WithMany("SOAs")
                        .HasForeignKey("BusinessUnitId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("IM.eSuite.Domain.Token", b =>
                {
                    b.HasOne("IM.eSuite.Domain.User", "User")
                        .WithOne("Token")
                        .HasForeignKey("IM.eSuite.Domain.Token", "UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("IM.eSuite.Domain.UserGroupUser", b =>
                {
                    b.HasOne("IM.eSuite.Domain.ApplicationUserGroup", "ApplicationUserGroup")
                        .WithMany("Users")
                        .HasForeignKey("ApplicationUserGroupId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("IM.eSuite.Domain.User", "User")
                        .WithMany("UserGroups")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("IM.eSuite.Domain.UserPlant", b =>
                {
                    b.HasOne("IM.eSuite.Domain.Plant", "Plant")
                        .WithMany("Users")
                        .HasForeignKey("PlantId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("IM.eSuite.Domain.User", "User")
                        .WithMany("Plants")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
