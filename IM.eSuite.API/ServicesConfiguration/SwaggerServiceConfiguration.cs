using Microsoft.Extensions.DependencyInjection;
using IM.eSuite.API.Configuration;
using Swashbuckle.AspNetCore.Swagger;
using Microsoft.Extensions.PlatformAbstractions;
using System.IO;

namespace IM.eSuite.API.ServicesConfiguration
{
    public static class SwaggerServiceConfiguration
    {
        public static void ConfigureSwaggerService(IServiceCollection services, SwaggerConfiguration swaggerConfiguration)
        {
            services.AddSwaggerGen(options => {
                options.SwaggerDoc(swaggerConfiguration.Version, new Info {
                    Title = swaggerConfiguration.Title,
                    Description = swaggerConfiguration.Description,
                    Version = swaggerConfiguration.Version
                });

                var basePath = PlatformServices.Default.Application.ApplicationBasePath;
                var xmlPath = Path.Combine(basePath, swaggerConfiguration.XMLConfigurationFileName); 
                options.IncludeXmlComments(xmlPath);
                options.CustomSchemaIds(t => t.FullName);
            });
        }
    }
}