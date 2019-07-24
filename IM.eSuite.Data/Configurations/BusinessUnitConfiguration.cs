using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using IM.eSuite.Domain;

namespace IM.eSuite.Data
{
    public class BusinessUnitConfiguration : IEntityTypeConfiguration<BusinessUnit>
    {
        public void Configure(EntityTypeBuilder<BusinessUnit> builder)
        {
            builder.HasMany(bu => bu.SOAs)
                .WithOne(soa => soa.BusinessUnit)
                .HasForeignKey(soa => soa.BusinessUnitId);
        }
    }
}