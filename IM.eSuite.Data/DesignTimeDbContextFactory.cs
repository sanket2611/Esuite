using System.IO;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
namespace IM.eSuite.Data
{
    public class DesignTimeDbContextFactory : IDesignTimeDbContextFactory<eSuiteDbContext>
    {        
        public eSuiteDbContext CreateDbContext(string[] args)
        {
            var configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())            
                .AddJsonFile("appsettings.json")
                .Build();            
            var builder = new DbContextOptionsBuilder<eSuiteDbContext>();
 
            var connectionString = configuration.GetConnectionString("eSuiteConnection");
    
            builder.UseSqlServer(connectionString);
    
            return new eSuiteDbContext(builder.Options);
        }
    }
}