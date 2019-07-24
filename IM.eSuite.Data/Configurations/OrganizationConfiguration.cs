using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using IM.eSuite.Domain;

namespace IM.eSuite.Data
{
    public class OrganizationConfiguration : IEntityTypeConfiguration<Organization>
    {
        public void Configure(EntityTypeBuilder<Organization> builder)
        {    
            builder.HasOne(o => o.Parent)
                .WithMany()
                .HasForeignKey(o => o.ParentId);
            
            builder.HasMany(o => o.SubOrganizations)
                .WithOne(o => o.Parent);            

            builder.HasOne(o => o.Plant)
                .WithMany(p => p.Departments)
                .HasForeignKey(o => o.PlantId);
        }
    }
}