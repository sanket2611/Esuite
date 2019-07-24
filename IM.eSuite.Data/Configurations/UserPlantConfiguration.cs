using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using IM.eSuite.Domain;

namespace IM.eSuite.Data
{
    public class UserPlantConfiguration : IEntityTypeConfiguration<UserPlant>
    {
        public void Configure(EntityTypeBuilder<UserPlant> builder)
        {
            builder.HasKey(up => new { up.UserId, up.PlantId });

            builder.HasOne(up => up.User)
                .WithMany(u => u.Plants)
                .HasForeignKey(up => up.UserId);

            builder.HasOne(up => up.Plant)
                .WithMany(p => p.Users)
                .HasForeignKey(up => up.PlantId);
        }
    }
}