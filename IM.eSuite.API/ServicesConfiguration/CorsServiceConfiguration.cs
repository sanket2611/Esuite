using System;
using Microsoft.Extensions.DependencyInjection;
using IM.eSuite.API.Configuration;

namespace IM.eSuite.API.ServicesConfiguration
{
    public static class CorsServiceConfiguration
    {        public static void ConfigureCorsService(IServiceCollection services, CorsConfiguration corsConfiguration)
        {
            services.AddCors(options => {
                options.AddPolicy(corsConfiguration.PolicyName, builder =>
                    builder.WithOrigins(corsConfiguration.Origins)
                        .AllowAnyHeader()
                        .AllowAnyMethod()
                        .AllowCredentials()
                        .SetPreflightMaxAge(TimeSpan.FromDays(14))
                );
            });
        }
    }
}