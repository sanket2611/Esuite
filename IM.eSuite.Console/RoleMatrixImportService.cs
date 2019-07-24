using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using IM.eSuite.Data;
using IM.eSuite.Domain;
using IM.NETCore.Core.Linq;
using Microsoft.EntityFrameworkCore;
using NPOI.SS.UserModel;
using NPOI.XSSF.UserModel;

namespace IM.eSuite.Console
{
    public class RoleMatrixImportService
    {
        private readonly IRepository<eSuiteDbContext> _repository;

        public RoleMatrixImportService(IRepository<eSuiteDbContext> repository)
        {
            _repository = repository;
        }

        public void Import(string filePath)
        {
            using(var stream = File.OpenRead(filePath))
            {
                var workbook = new XSSFWorkbook(stream);

                var applications = Enum.GetValues(typeof(ApplicationEnum));

                foreach (var application in applications)
                {
                    var sheet = workbook.GetSheet(application.ToString());
                    if(sheet == null){
                        continue;
                    }

                    var header = sheet.GetRow(0);
                    if(!isValidHeader(header)){
                        System.Console.WriteLine($"Header is invalid for application {application}");
                        continue;
                    }

                    for (int i = 1; i <= sheet.LastRowNum; i++)
                    {
                        var row = sheet.GetRow(i);
                        var userGroup = row.GetCell(0).StringCellValue;
                        var dbUserGroup = _repository.FindBy<ApplicationUserGroup>(aug => aug.ApplicationId == (int)application && aug.Name == userGroup)
                            .Include(aug => aug.UserGroupRoles)
                            .FirstOrDefault();
                        
                        if(dbUserGroup == null){
                            System.Console.WriteLine($"User group {userGroup} has not been found for application {application}.");
                            continue;
                        }

                        var roles = new List<ApplicationUserGroupRole>();

                        for(var j = 1; j < row.LastCellNum; j++){
                            var hasRole = !string.IsNullOrWhiteSpace(row.GetCell(j).StringCellValue);
                            if(hasRole){
                                var dbRole = _repository.FindBy<Role>(r => r.Name == header.GetCell(j).StringCellValue)
                                    .FirstOrDefault();

                                roles.Add(new ApplicationUserGroupRole{
                                    ApplicationUserGroupId = dbUserGroup.Id,
                                    RoleId = dbRole.Id
                                });
                            }
                        }

                        _repository.UpdateManyToMany(dbUserGroup.UserGroupRoles, roles, r => r.RoleId);
                        System.Console.WriteLine($"{application} - {userGroup} - roles: {roles.Count}");

                        _repository.Update(dbUserGroup);
                        _repository.Save();
                    }
                }
            }
        }

        private bool isValidHeader(IRow headerRow)
        {
            for (int i = 1; i < headerRow.LastCellNum; i++)
            {
                var role = headerRow.GetCell(i)?.StringCellValue;
                if(string.IsNullOrWhiteSpace(role)){ 
                    return false;
                }
                
                if(typeof(UserRole).GetField(role) == null){
                    return false;
                }
            }

            return true;
        }
    }
}