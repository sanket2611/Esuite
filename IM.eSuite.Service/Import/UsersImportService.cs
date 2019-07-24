using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IM.eSuite.Domain;
using IM.NETCore.Core.Linq;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using NPOI.SS.UserModel;
using NPOI.XSSF.UserModel;

namespace IM.eSuite.Service
{
    public class UsersImportService : AbstractImportService, IUsersImportService
    {
        private const string sheetName = "Users";
        protected override string[] rowHeader => new string[] { "*Plant", "*SGID", "*Role eSuite EHS", "*Role eSMAT", "*Role eAction", "*Role eRisk" };
        private readonly IDirectoryApiService _directoryApiService;
        private readonly IUserService _userService;

        public UsersImportService(IRepository<DbContext> repository, IDirectoryApiService directoryApiService, IUserService userService) : base(repository)
        {
            _directoryApiService = directoryApiService;
            _userService = userService;
        }

        public override async Task<ImportResult> Import(IFormFile file)
        {
            var result = new ImportResult();

            using (var stream = file.OpenReadStream())
            {
                var workbook = new XSSFWorkbook(stream);
                var sheet = workbook.GetSheet(sheetName);
                if (sheet == null)
                {
                    result.Errors.Add(new KeyValuePair<int, string>(0, $"Sheet {sheetName} doesn't exists."));
                    return result;
                }

                var headerRow = sheet.GetRow(0);
                if (!isValidHeaderRow(headerRow))
                {
                    result.Errors.Add(new KeyValuePair<int, string>(0, "Header is invalid"));
                    return result;
                }

                for (var i = 1; i < sheet.LastRowNum + 1; i++)
                {
                    var row = sheet.GetRow(i);

                    var plantName = row.GetCell(0)?.StringCellValue;
                    var dbPlant = _repository.FindBy<Plant>(p => p.Name == plantName).FirstOrDefault();

                    if (dbPlant == null)
                    {
                        result.Errors.Add(new KeyValuePair<int, string>(i, "Plant is invalid"));
                        continue;
                    }

                    var eSuiteGroupName = row.GetCell(2)?.StringCellValue;
                    var dbeSuiteGroup = _repository.FindBy<ApplicationUserGroup>(g => g.ApplicationId == (int)ApplicationEnum.eSuite
                        && eSuiteGroupName == g.Name).FirstOrDefault();
                    var eSmatGroupName = row.GetCell(3)?.StringCellValue;
                    var dbeSmatGroup = _repository.FindBy<ApplicationUserGroup>(g => g.ApplicationId == (int)ApplicationEnum.eSMAT
                        && eSmatGroupName == g.Name).FirstOrDefault();
                    var eActionGroupName = row.GetCell(4)?.StringCellValue;
                    var dbeActionGroup = _repository.FindBy<ApplicationUserGroup>(g => g.ApplicationId == (int)ApplicationEnum.eAction
                        && eActionGroupName == g.Name).FirstOrDefault();
                    var eRiskGroupName = row.GetCell(5)?.StringCellValue;
                    var dbeRiskGroup = _repository.FindBy<ApplicationUserGroup>(g => g.ApplicationId == (int)ApplicationEnum.eRisk
                        && eRiskGroupName == g.Name).FirstOrDefault();

                    if (dbeSuiteGroup == null)
                    {
                        result.Errors.Add(new KeyValuePair<int, string>(i, "eSuite Role is invalid"));
                        continue;
                    }
                    if (dbeSmatGroup == null)
                    {
                        result.Errors.Add(new KeyValuePair<int, string>(i, "eSMAT Role is invalid"));
                        continue;
                    }
                    if (dbeActionGroup == null)
                    {
                        result.Errors.Add(new KeyValuePair<int, string>(i, "eAction Role is invalid"));
                        continue;
                    }
                    if (dbeRiskGroup == null)
                    {
                        result.Errors.Add(new KeyValuePair<int, string>(i, "eRisk Role is invalid"));
                        continue;
                    }

                    var sgId = row.GetCell(1)?.StringCellValue;
                    if (string.IsNullOrWhiteSpace(sgId))
                    {
                        result.Errors.Add(new KeyValuePair<int, string>(i, "SGId is invalid"));
                        continue;
                    }

                    var dbUser = _repository.FindBy<User>(u => u.UserName == sgId)
                        .Include(u => u.Plants)
                        .Include(u => u.UserGroups)
                        .FirstOrDefault();
                    if (dbUser != null)
                    {
                        if (!dbUser.Plants.Any(up => up.PlantId == dbPlant.Id))
                        {
                            dbUser.Plants.Add(new UserPlant { UserId = dbUser.Id, PlantId = dbPlant.Id });
                        }

                        if (!dbUser.UserGroups.Any(ug => ug.ApplicationUserGroupId == dbeSuiteGroup.Id))
                        {
                            dbUser.UserGroups.Add(new UserGroupUser { UserId = dbUser.Id, ApplicationUserGroupId = dbeSuiteGroup.Id });
                        }
                        if (!dbUser.UserGroups.Any(ug => ug.ApplicationUserGroupId == dbeSmatGroup.Id))
                        {
                            dbUser.UserGroups.Add(new UserGroupUser { UserId = dbUser.Id, ApplicationUserGroupId = dbeSmatGroup.Id });
                        }
                        if (!dbUser.UserGroups.Any(ug => ug.ApplicationUserGroupId == dbeActionGroup.Id))
                        {
                            dbUser.UserGroups.Add(new UserGroupUser { UserId = dbUser.Id, ApplicationUserGroupId = dbeActionGroup.Id });
                        }
                        if (!dbUser.UserGroups.Any(ug => ug.ApplicationUserGroupId == dbeRiskGroup.Id))
                        {
                            dbUser.UserGroups.Add(new UserGroupUser { UserId = dbUser.Id, ApplicationUserGroupId = dbeRiskGroup.Id });
                        }
                        _repository.Update(dbUser);
                    }
                    else
                    {
                        var directoryUser = await _directoryApiService.GetUserBySGId(sgId);
                        if (directoryUser == null)
                        {
                            result.Errors.Add(new KeyValuePair<int, string>(i, "SGId is invalid"));
                            continue;
                        }

                        var user = new User
                        {
                            UserName = directoryUser.StGoSGI,
                            FirstName = directoryUser.GivenName,
                            LastName = directoryUser.Sn,
                            Email = directoryUser.Mail
                        };

                        user.Plants = new List<UserPlant> { new UserPlant { UserId = user.Id, PlantId = dbPlant.Id } };
                        user.UserGroups = new List<UserGroupUser>();
                        user.UserGroups.Add(new UserGroupUser { UserId = user.Id, ApplicationUserGroupId = dbeSuiteGroup.Id });
                        user.UserGroups.Add(new UserGroupUser { UserId = user.Id, ApplicationUserGroupId = dbeSmatGroup.Id });
                        user.UserGroups.Add(new UserGroupUser { UserId = user.Id, ApplicationUserGroupId = dbeActionGroup.Id });
                        user.UserGroups.Add(new UserGroupUser { UserId = user.Id, ApplicationUserGroupId = dbeRiskGroup.Id });
                        _repository.Add(user);
                        user.UserGroups.ToList().ForEach(_repository.Add);

                        _repository.Save();
                        await _userService.PublishSaveEventAsync(user.Id);
                    }

                    result.Imported++;
                }
            }

            return result;
        }
    }
}