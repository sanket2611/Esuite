using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using IM.eSuite.Domain;

namespace IM.eSuite.Data
{
    public class ApplicationConfiguration : IEntityTypeConfiguration<Application>
    {
        public void Configure(EntityTypeBuilder<Application> builder)
        {            
            builder.Property(a => a.Id).ValueGeneratedNever();
            builder.HasMany(a => a.UserGroups)
                .WithOne(aug => aug.Application)
                .HasForeignKey(aug => aug.ApplicationId);              
        }
    }
}