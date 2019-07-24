using System.IO;
using IM.NETCore.Core.Linq;
using IM.eSuite.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.CommandLineUtils;

namespace IM.eSuite.Console
{
    class Program
    {
        static void Main(string[] args)
        {
            var app = new CommandLineApplication();
            app.Name = "eSuite command line utility";
            app.HelpOption("-?|-h|--help");

            app.Command("import", (command) => {
                command.Description = "Import data in eSuite.";
                command.HelpOption("-?|-h|--help");

                var plantOption = command.Option("-p | --plant ", "To import plants", CommandOptionType.NoValue);
                var roleMatrixOption = command.Option("-r | --role ", "To import roles matrix", CommandOptionType.NoValue);
                var fileNameOption = command.Option("-f | --fileName <fileName>", "Excel file name", CommandOptionType.SingleValue);
                var sheetNameOption = command.Option("-s | --sheetName <sheetName>", "Spreadsheet name", CommandOptionType.SingleValue);

                command.OnExecute(() => {
                    if (plantOption.HasValue() && (string.IsNullOrEmpty(fileNameOption.Value()) || string.IsNullOrEmpty(sheetNameOption.Value()))) {
                        app.ShowHelp();
                        return 0;
                    }
                
                    var repository = getRepository();   
                    
                    if(plantOption.HasValue()){
                        System.Console.WriteLine("Starting plant integration...");                                 
                        var filePath = Path.Combine(Directory.GetCurrentDirectory(), fileNameOption.Value());
                        var importService = new PlantImportService(repository);
                        importService.Import(filePath, sheetNameOption.Value());
                        System.Console.WriteLine("End plant integration.");        
                        
                    }

                    if(roleMatrixOption.HasValue()){
                        System.Console.WriteLine("Starting user matrix import");                                 
                        var filePath = Path.Combine(Directory.GetCurrentDirectory(), "Roles_Matrix.xlsx");
                        var roleMatrixService = new RoleMatrixImportService(repository);
                        roleMatrixService.Import(filePath);
                        System.Console.WriteLine("End user matrix import");     
                    }
                    
                    return 0;                    
                });

            });

            app.OnExecute(() => {                
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
    }
}
