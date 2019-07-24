using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using IM.NETCore.Core.Cryptography.Helpers;
using IM.NETCore.Web;
using IM.NETCore.Web.Jwt;

namespace IM.eSuite.API.ServicesConfiguration
{
    public static class JwtServiceConfiguration
    {
        public static void ConfigureJwtService(IServiceCollection services, JwtConfiguration jwtConfiguration)
        {
            var publicKey = SecurityKeyHelper.GetRSAKeyFromXml(jwtConfiguration.PublicKeyXmlFilePath);

            var options = new JwtBearerOptions {
                TokenValidationParameters = {
                    ValidateIssuerSigningKey = jwtConfiguration.ValidateIssuerSigningKey,
                    IssuerSigningKey = publicKey,
                    ValidateIssuer = jwtConfiguration.ValidateIssuer,
                    ValidIssuer = jwtConfiguration.Issuer,
                    ValidateAudience =jwtConfiguration.ValidateAudience,
                    ValidAudience = jwtConfiguration.Audience,
                    ValidateLifetime = jwtConfiguration.ValidateLifetime,
                    ClockSkew = TimeSpan.FromSeconds(jwtConfiguration.ClockSkew)                                  
                },
                RequireHttpsMetadata = jwtConfiguration.RequireHttpsMetadata                
            };
            
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(o => {
                    o.TokenValidationParameters = options.TokenValidationParameters;
                    o.RequireHttpsMetadata = options.RequireHttpsMetadata;
                    o.Events = new JwtBearerEvents {
                        OnTokenValidated = context => {
                            var p = context.Principal;                            
                            return Task.FromResult(0);
                        },
                        OnAuthenticationFailed = context => {
                            if(context.Exception is SecurityTokenExpiredException)
                            {
                                var c = context;
                            }
                            
                            return Task.FromResult(0);
                        }                   
                    };                    
                });
        }
    }
}