using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using IM.NETCore.Data;
using IM.eSuite.Domain;

namespace IM.eSuite.Data
{
    public class eSuiteDbContext : DbContext
    {        
        public DbSet<User> User { get; set; }
        public DbSet<UserPlant> UserPlant { get; set; }
        public DbSet<UserGroupUser> UserGroupUser { get; set; }
        public DbSet<ApplicationUserGroup> ApplicationUserGroup { get; set; }
        public DbSet<ApplicationUserGroupRole> ApplicationUserGroupRole { get; set; }
        public DbSet<Role> Role { get; set; }
        public DbSet<Application> Application { get; set; }
        public DbSet<Delegation> Delegation { get; set; }
        public DbSet<Country> Country { get; set; }
        public DbSet<Sector> Sector { get; set; }
        public DbSet<BusinessUnit> BusinessUnit { get; set; }
        public DbSet<SOA> SOA { get; set; }
        public DbSet<Plant> Plant { get; set; }
        public DbSet<Organization> Organization { get; set; }        

        public eSuiteDbContext(DbContextOptions<eSuiteDbContext> options)
            : base (options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)      
        { 
            base.OnModelCreating(modelBuilder);            
            modelBuilder.ApplyConfiguration(new ApplicationConfiguration());
            modelBuilder.ApplyConfiguration(new ApplicationUserGroupRoleConfiguration());
            modelBuilder.ApplyConfiguration(new UserGroupUserConfiguration());
            modelBuilder.ApplyConfiguration(new UserPlantConfiguration());
            modelBuilder.ApplyConfiguration(new DelegationConfiguration());
            modelBuilder.ApplyConfiguration(new SectorConfiguration());
            modelBuilder.ApplyConfiguration(new BusinessUnitConfiguration());
            modelBuilder.ApplyConfiguration(new PlantConfiguration());
            modelBuilder.ApplyConfiguration(new OrganizationConfiguration());
        } 
    }
}