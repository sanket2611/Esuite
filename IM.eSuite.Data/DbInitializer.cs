using IM.NETCore.Core.Linq;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using IM.eSuite.Domain;
using System.Collections.Generic;

namespace IM.eSuite.Data
{
    public static class DbInitializer
    {
        public static void Initialize(DbContext context, IRepository<DbContext> repository)
        {
            context.Database.Migrate();
            SeedData(repository);
        }

        private static void SeedData(IRepository<DbContext> repository)
        {
            //create applications
            var eSuiteApplication = new Application { Id = (int)ApplicationEnum.eSuite, Name = "eSuite" };
            addApplication(eSuiteApplication, repository);
            var eSmatApplication = new Application { Id = (int)ApplicationEnum.eSMAT, Name = "eSmat" };
            addApplication(eSmatApplication, repository);
            var eRiskApplication = new Application { Id = (int)ApplicationEnum.eRisk, Name = "eRisk" };
            addApplication(eRiskApplication, repository);         

            var eActionApplication = new Application { Id = (int)ApplicationEnum.eAction, Name = "eAction" };
            addApplication(eActionApplication, repository);            

            //Create roles
            addRoles(repository);            

            //Create profiles with all roles            
            var eSuiteAllRoles = repository.FindBy<Role>(r => r.Name.StartsWith(eSuiteApplication.Name));
            addOrUpdateGroups(eSuiteApplication.Id, "Administrator", eSuiteAllRoles, repository);            
            
            addOrUpdateGroups(eSuiteApplication.Id, "User", null, repository);

            var eSmatAllRoles = repository.FindBy<Role>(r => r.Name.StartsWith(eSmatApplication.Name));          
            addOrUpdateGroups(eSmatApplication.Id, "Administrator", eSmatAllRoles, repository);

            addOrUpdateGroups(eSmatApplication.Id, "SMAT Leader", null, repository);
            addOrUpdateGroups(eSmatApplication.Id, "Action Responsible", null, repository);
            addOrUpdateGroups(eSmatApplication.Id, "Local Manager", null, repository);
            addOrUpdateGroups(eSmatApplication.Id, "Central Manager", null, repository);

            var eActionAllRoles = repository.FindBy<Role>(r => r.Name.StartsWith(eActionApplication.Name));          
            addOrUpdateGroups(eActionApplication.Id, "Administrator", eActionAllRoles.Where(r => r.Name != UserRole.eAction_Is_ActionResponsible), repository);

            addOrUpdateGroups(eActionApplication.Id, "Action Leader", null, repository);
            addOrUpdateGroups(eActionApplication.Id, "Action Responsible", null, repository);
            addOrUpdateGroups(eActionApplication.Id, "Local Manager", null, repository);
            addOrUpdateGroups(eActionApplication.Id, "Central Manager", null, repository);

            var eRiskAllRoles = repository.FindBy<Role>(r => r.Name.StartsWith(eRiskApplication.Name));          
            addOrUpdateGroups(eRiskApplication.Id, "Administrator", eRiskAllRoles.Where(r => r.Name != UserRole.eRisk_Owner_Risk), repository);
            addOrUpdateGroups(eRiskApplication.Id, "RISK Leader", null, repository);
            addOrUpdateGroups(eRiskApplication.Id, "RISK Responsible", null, repository); 
            addOrUpdateGroups(eRiskApplication.Id, "Local Manager", null, repository);  
            addOrUpdateGroups(eRiskApplication.Id, "Central Manager", null, repository);  
        }        

        private static void addApplication(Application application, IRepository<DbContext> repository)
        {
            var dbApplication = repository.FindBy<Application>(a => a.Id == application.Id).FirstOrDefault();
            if(dbApplication != null) {
                dbApplication.Name = application.Name;
                repository.Update(dbApplication);
            }
            else {
                repository.Add(application);
            }
            repository.Save();
        }

        private static void addRoles(IRepository<DbContext> repository)
        {
            var roles = typeof(UserRole).GetFields();
            foreach(var role in roles)
            {
                var value = role.GetValue(null).ToString();
                if(!repository.FindBy<Role>(r => r.Name == value).Any())
                {
                    repository.Add(new Role { Name = value });                    
                }
            }

            repository.Save();
        }

        private static void addOrUpdateGroups(int applicationId, string name, IEnumerable<Role> roles, IRepository<DbContext> repository)
        {            
            var applicationUserGroup = repository.FindBy<ApplicationUserGroup>(aug => aug.Name == name 
                && aug.ApplicationId == applicationId)
                .Include(u => u.UserGroupRoles)
                .FirstOrDefault();            
            
            if(applicationUserGroup == null)
            {
                applicationUserGroup = new ApplicationUserGroup {
                    ApplicationId = applicationId,
                    Name = name   
                };

                if(roles != null){
                    applicationUserGroup.UserGroupRoles = roles.Select(r => 
                        new ApplicationUserGroupRole {                   
                            RoleId = r.Id                    
                        }).ToList();
                }
                
                repository.Add(applicationUserGroup);
            }
            else
            {
                if(roles != null){
                    var userGroupRoles = roles.Select(r => 
                        new ApplicationUserGroupRole {                    
                            RoleId = r.Id,
                            ApplicationUserGroupId = applicationUserGroup.Id
                        }).ToList();
                
                    repository.UpdateManyToMany(applicationUserGroup.UserGroupRoles, userGroupRoles, ugr => ugr.RoleId);
                }
                
                repository.Update(applicationUserGroup);
            }

            repository.Save();
        }
    }
}