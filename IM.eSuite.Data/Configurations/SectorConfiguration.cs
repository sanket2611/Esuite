using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using IM.eSuite.Domain;

namespace IM.eSuite.Data
{
    public class SectorConfiguration : IEntityTypeConfiguration<Sector>
    {
        public void Configure(EntityTypeBuilder<Sector> builder)
        {
            builder.HasIndex(s => s.Name).IsUnique();

            builder.HasMany(s => s.BusinessUnits)
                .WithOne(bu => bu.Sector)
                .HasForeignKey(bu => bu.SectorId);
        }
    }
}