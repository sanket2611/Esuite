using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using IM.eSuite.Domain;

namespace IM.eSuite.Data
{
    public class DelegationConfiguration : IEntityTypeConfiguration<Delegation>
    {
        public void Configure(EntityTypeBuilder<Delegation> builder)
        {
            builder.HasIndex(d => d.Name).IsUnique();

            builder.HasMany(d => d.Countries)
                .WithOne(c => c.Delegation)
                .HasForeignKey(c => c.DelegationId);
        }
    }
}