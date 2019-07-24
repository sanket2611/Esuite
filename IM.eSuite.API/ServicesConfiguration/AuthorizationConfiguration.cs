using System;
using Microsoft.Extensions.DependencyInjection;
using IM.eSuite.API.Configuration;
using IM.eSuite.Domain;

namespace IM.eSuite.API.ServicesConfiguration
{
    public static class AuthorizationConfiguration
    {        
        public static void ConfigureAuthorization(IServiceCollection services)
        {
            services.AddAuthorization(options =>
            {
                options.AddPolicy(UserRole.eSuite_Administration_User_Read, policy => 
                    policy.RequireClaim(UserRole.eSuite_Administration_User_Read));
                options.AddPolicy(UserRole.eSuite_Administration_User_Write, policy => 
                    policy.RequireClaim(UserRole.eSuite_Administration_User_Write));

                options.AddPolicy(UserRole.eSuite_Administration_UserGroup_Read, policy => 
                    policy.RequireClaim(UserRole.eSuite_Administration_UserGroup_Read));

                options.AddPolicy(UserRole.eSuite_Application_Read, policy => 
                    policy.RequireClaim(UserRole.eSuite_Application_Read));

                options.AddPolicy(UserRole.eSuite_MasterData_BusinessUnit_Read, policy => 
                    policy.RequireClaim(UserRole.eSuite_MasterData_BusinessUnit_Read));
                options.AddPolicy(UserRole.eSuite_MasterData_Country_Read, policy => 
                    policy.RequireClaim(UserRole.eSuite_MasterData_Country_Read));
                options.AddPolicy(UserRole.eSuite_MasterData_Delegation_Read, policy => 
                    policy.RequireClaim(UserRole.eSuite_MasterData_Delegation_Read));

                options.AddPolicy(UserRole.eSuite_MasterData_Organization_Read, policy => 
                    policy.RequireClaim(UserRole.eSuite_MasterData_Organization_Read));
                options.AddPolicy(UserRole.eSuite_MasterData_Organization_Write, policy => 
                    policy.RequireClaim(UserRole.eSuite_MasterData_Organization_Write));

                options.AddPolicy(UserRole.eSuite_MasterData_Plant_Read, policy => 
                    policy.RequireClaim(UserRole.eSuite_MasterData_Plant_Read));
                options.AddPolicy(UserRole.eSuite_MasterData_Plant_Write, policy => 
                    policy.RequireClaim(UserRole.eSuite_MasterData_Plant_Write));
                
                options.AddPolicy(UserRole.eSuite_MasterData_Sector_Read, policy => 
                    policy.RequireClaim(UserRole.eSuite_MasterData_Sector_Read));
                options.AddPolicy(UserRole.eSuite_MasterData_SOA_Read, policy => 
                    policy.RequireClaim(UserRole.eSuite_MasterData_SOA_Read));                
            });
        }
    }
}