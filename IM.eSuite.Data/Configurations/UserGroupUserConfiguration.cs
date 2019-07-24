using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using IM.eSuite.Domain;

namespace IM.eSuite.Data
{
    public class UserGroupUserConfiguration : IEntityTypeConfiguration<UserGroupUser>
    {
        public void Configure(EntityTypeBuilder<UserGroupUser> builder)
        {
            builder.HasKey(ugu => new { ugu.UserId, ugu.ApplicationUserGroupId });

            builder.HasOne(ugu => ugu.User)
                .WithMany(u => u.UserGroups)
                .HasForeignKey(ugu => ugu.UserId);

            builder.HasOne(ugu => ugu.ApplicationUserGroup)
                .WithMany(aug => aug.Users)
                .HasForeignKey(ugu => ugu.ApplicationUserGroupId);
        }
    }
}