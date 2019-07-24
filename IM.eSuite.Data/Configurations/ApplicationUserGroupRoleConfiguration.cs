using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using IM.eSuite.Domain;

namespace IM.eSuite.Data
{
    public class ApplicationUserGroupRoleConfiguration : IEntityTypeConfiguration<ApplicationUserGroupRole>
    {
        public void Configure(EntityTypeBuilder<ApplicationUserGroupRole> builder)
        {   
            builder.HasKey(augr => new { augr.ApplicationUserGroupId, augr.RoleId });
                   
            builder.HasOne(augr => augr.ApplicationUserGroup)
                .WithMany(aug => aug.UserGroupRoles)
                .HasForeignKey(augr => augr.ApplicationUserGroupId);
            
            builder.HasOne(augr => augr.Role)
                .WithMany(r => r.ApplicationUserGroupRoles)
                .HasForeignKey(augr => augr.RoleId);
        }
    }
}