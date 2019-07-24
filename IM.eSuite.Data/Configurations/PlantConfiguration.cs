using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using IM.eSuite.Domain;

namespace IM.eSuite.Data
{
    public class PlantConfiguration : IEntityTypeConfiguration<Plant>
    {
        public void Configure(EntityTypeBuilder<Plant> builder)
        {    
            builder.HasIndex(p => p.GaiaCode).IsUnique();

            builder.HasOne(p => p.Country)
                .WithMany(c => c.Plants)
                .HasForeignKey(p => p.CountryId);
            
            builder.HasOne(p => p.SOA)
                .WithMany(soa => soa.Plants)
                .HasForeignKey(p => p.SOAId);
        }
    }
}