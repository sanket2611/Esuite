using IM.eSuite.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace IM.eSuite.API.ServicesConfiguration
{
    public static class DbContextOptionsConfiguration
    {
        public static void ConfigureDbContextOptions(IServiceCollection services, string connectionString)
        {
            var dbContextOptionBuilder = new DbContextOptionsBuilder<eSuiteDbContext>();
            dbContextOptionBuilder.UseSqlServer(connectionString, 
                o => o.UseRowNumberForPaging());
            services.AddSingleton(dbContextOptionBuilder.Options);
        }
    }
}