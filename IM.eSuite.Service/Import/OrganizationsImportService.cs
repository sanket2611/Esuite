using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IM.eSuite.Common;
using IM.eSuite.Domain;
using IM.NETCore.Core.Linq;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using NPOI.XSSF.UserModel;

namespace IM.eSuite.Service
{
    public class OrganizationsImportService : AbstractImportService, IOrganizationsImportService
    {
        private readonly IOrganizationService _organizationService;
        private const string sheetName = "Organizations";
        protected override string[] rowHeader => new string[] {"*Plant", "*Department", "*Workshop", "*Job", "*Workstation", "Task (not mandatory)"};

        public OrganizationsImportService(IOrganizationService organizationService, IRepository<DbContext> repository): base(repository)
        {
            _organizationService = organizationService;
        }

        public override async Task<ImportResult> Import(IFormFile file)
        {
            var result = new ImportResult();

            using(var stream = file.OpenReadStream())
            {
                var workbook = new XSSFWorkbook(stream);                
                var sheet = workbook.GetSheet(sheetName);
                if(sheet == null)
                {
                    result.Errors.Add(new KeyValuePair<int, string>(0, $"Sheet {sheetName} doesn't exists."));
                    return result;
                }

                var headerRow = sheet.GetRow(0);
                if(!isValidHeaderRow(headerRow))
                {
                    result.Errors.Add(new KeyValuePair<int, string>(0, "Header is invalid"));
                    return result;
                }

                for(var i = 1; i < sheet.LastRowNum + 1; i++)
                {
                    var row = sheet.GetRow(i);

                    var plantName = row.GetCell(0)?.StringCellValue;
                    var dbPlant = await _repository.FindBy<Plant>(p => p.Name == plantName).FirstOrDefaultAsync();

                    if(dbPlant == null)
                    {
                        result.Errors.Add(new KeyValuePair<int, string>(i, "Plant is invalid"));
                        continue;
                    }

                    var departmentName = row.GetCell(1)?.StringCellValue;
                    if(string.IsNullOrWhiteSpace(departmentName))
                    {
                        result.Errors.Add(new KeyValuePair<int, string>(i, "Department is required"));
                        continue;
                    }

                    var workshopName = row.GetCell(2)?.StringCellValue;
                    if(string.IsNullOrWhiteSpace(workshopName))
                    {
                        result.Errors.Add(new KeyValuePair<int, string>(i, "Workshop is required"));
                        continue;
                    }

                    var jobName = row.GetCell(3)?.StringCellValue;
                    if(string.IsNullOrWhiteSpace(jobName))
                    {
                        result.Errors.Add(new KeyValuePair<int, string>(i, "Job is required"));
                        continue;
                    }

                    var workStationName = row.GetCell(4)?.StringCellValue;
                    if(string.IsNullOrWhiteSpace(workStationName))
                    {
                        result.Errors.Add(new KeyValuePair<int, string>(i, "Workstation is required"));
                        continue;
                    }

                    var dbDepartment = await _repository.FindBy<Organization>(o => o.PlantId == dbPlant.Id && o.Name == departmentName 
                        && o.Type == OrganizationLevelType.Department)
                        .FirstOrDefaultAsync();
                    
                    if (dbDepartment == null)
                    {
                        dbDepartment = new Organization { PlantId = dbPlant.Id, Name = departmentName, Type = OrganizationLevelType.Department };
                        _repository.Add(dbDepartment);
                        await saveOrganization(dbDepartment);
                    }
                    else if (dbDepartment.IsDeleted)
                    {
                        dbDepartment.IsDeleted = false;
                        _repository.Update(dbDepartment);
                        await saveOrganization(dbDepartment);
                    }                 

                    var dbWorkshop = await upsertOrganization(workshopName, OrganizationLevelType.Workshop, dbDepartment.Id);
                    var dbJob = await upsertOrganization(jobName, OrganizationLevelType.Job, dbWorkshop.Id);
                    var dbWorkstation = await upsertOrganization(workStationName, OrganizationLevelType.Workstation, dbJob.Id);

                    var taskName = row.GetCell(5)?.StringCellValue;
                    if(!string.IsNullOrWhiteSpace(taskName))
                    {
                       await upsertOrganization(taskName, OrganizationLevelType.Task, dbWorkstation.Id);
                    }                    
                   
                    result.Imported++;
                }
            }

            return await Task.FromResult(result);
        }

        private async Task<Organization> upsertOrganization(string name, OrganizationLevelType type, int parentId)
        {
            var dbOrganization = await _repository.FindBy<Organization>(o => o.Name == name && o.Type == type && o.ParentId == parentId)
                .FirstOrDefaultAsync();
                    
            if (dbOrganization == null)
            {
                dbOrganization = new Organization { Name = name, Type = type, ParentId = parentId };
                _repository.Add(dbOrganization);
                await saveOrganization(dbOrganization);
            }
            else if (dbOrganization.IsDeleted)
            {
                dbOrganization.IsDeleted = false;
                _repository.Update(dbOrganization);
                await saveOrganization(dbOrganization);
            }

            return dbOrganization;
        }

        private async Task saveOrganization(Organization organization)
        {
            _repository.Save();
            await _organizationService.PublishSaveEventAsync(organization);
        }
    }
}