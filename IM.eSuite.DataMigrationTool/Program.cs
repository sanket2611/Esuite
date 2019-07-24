using System;
using System.Data.Common;
using System.Data.SqlClient;
using System.Diagnostics;
using System.IO;
using IM.eSuite.Data;
using IM.eSuite.Domain;
using IM.NETCore.Core.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.CommandLineUtils;
using Microsoft.Extensions.Configuration;

namespace IM.eSuite.DataMigrationTool
{
    class Program
    {
        static void Main(string[] args)
        {
            var app = new CommandLineApplication(throwOnUnexpectedArg: false);
            //var fileNameOption = app.Option("-f | --fileName <fileName>", "Excel file name", CommandOptionType.SingleValue);

            app.OnExecute(() => {
                var sw = new Stopwatch();
                sw.Start();
                Console.WriteLine("Starting eSuite data migration at " + DateTime.Now.ToLongTimeString() + " ...");

                var repository = getRepository();            

                var conn = GetConnection();
                conn.Open();
                
                UserStep.Process(conn, repository);
                Organization1Step.Process(conn, repository);
                Organization2Step.Process(conn, repository);
                Organization3Step.Process(conn, repository);
                Organization4Step.Process(conn, repository);
                Organization5Step.Process(conn, repository);
                UserGroupUserStep.Process(conn, repository);
                UserPlantStep.Process(conn, repository);
                sw.Stop();

                Console.WriteLine("Ended eSuite data migration at " + DateTime.Now.ToLongTimeString() + ", it took " + sw.Elapsed.ToString("h'h 'm'm 's's'"));
                return 0;
            });
            app.Execute(args);
        }

        private static IRepository<eSuiteDbContext> getRepository()
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json", optional: true);

            var configuration = builder.Build();
            var connectionString = configuration.GetConnectionString("eSuiteConnection");
            
            var dbContextOptionBuilder = new DbContextOptionsBuilder<eSuiteDbContext>();
            dbContextOptionBuilder.UseSqlServer(connectionString);
            var dbContext = new eSuiteDbContext(dbContextOptionBuilder.Options);
            var repository = new Repository<eSuiteDbContext>(dbContext);
            return repository;
        }

        private static SqlConnection GetConnection()
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json", optional: true);

            var configuration = builder.Build();
            var connectionString = configuration.GetConnectionString("eSMATv1Connection");
            
            var ret = new SqlConnection(connectionString);
            return ret;
        }
    }
}
