using IM.eSuite.API.Configuration;
using IM.eSuite.Service;
using IM.NETCore.Web.Jwt;
using IM.NETCore.Web.OAuth;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace IM.eSuite.API.ServicesConfiguration
{
    public static class ConfigurationDtoConfiguration
    {
        public static void ConfigureConfigurationDto(IServiceCollection services, IConfiguration appConfiguration)
        {
            services.Configure<CorsConfiguration>(appConfiguration.GetSection("Cors"));
            services.Configure<OAuthConfiguration>(appConfiguration.GetSection("OAuth"));
            services.Configure<JwtConfiguration>(appConfiguration.GetSection("Jwt"));
            services.Configure<SwaggerConfiguration>(appConfiguration.GetSection("Swagger"));
            services.Configure<DirectoryApiConfiguration>(appConfiguration.GetSection("DirectoryApi"));
        }
    }
}