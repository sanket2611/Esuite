using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using IM.NETCore.Web.Filters;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using IM.eSuite.API.Dto;
using IM.eSuite.Domain;
using Microsoft.AspNetCore.Http;
using IM.eSuite.Service;
using System.Threading.Tasks;
using AutoMapper;
using IM.DotNet.Linq;

namespace IM.eSuite.API.Controllers
{
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        private readonly IM.NETCore.Core.Linq.IRepository<DbContext> _repository;
        private readonly IUserService _userService;
        private readonly IUsersImportService _usersImportService;
        private readonly IUserPropertyMappingService _userPropertyMappingService;

        public UserController(IM.NETCore.Core.Linq.IRepository<DbContext> repository, IUserService userService,
            IUsersImportService usersImportService, IUserPropertyMappingService userPropertyMappingService)
        {            
            _repository = repository;
            _userService = userService;
            _usersImportService = usersImportService;
            _userPropertyMappingService = userPropertyMappingService;
        }

        /// <summary>
        /// Get the list of users
        /// </summary>
        /// <param name="pageNumber">The page number</param>
        /// <param name="pageSize"> The page size</param>
        /// <param name="sortBy">Property to sort on</param>
        /// <param name="isDescending">Indicates if sort is descending or ascending</param>        
        /// <returns>A PagedList of users</returns>
        /// <response code="200">Returns the user list</response>
        [HttpGet]
        [Authorize(Policy = UserRole.eSuite_Administration_User_Read)]
        [Route("get/{pageNumber?}/{pageSize?}/{sortBy?}/{isDescending?}")]
        [ProducesResponseType(typeof(PagedList<UserListDto>), (int)HttpStatusCode.OK)]
        public IActionResult Get(int? pageNumber, int? pageSize, string sortBy, bool isDescending)
        {
            if (!_userPropertyMappingService.ValidMappingExists(sortBy))
            {
                return BadRequest("property mapping doesn't exist");
            }

            var sgid = User.Identity.Name;
            var myPlantIds = _repository.FindBy<UserPlant>(up => up.User.UserName == sgid).Select(up => up.PlantId);

            var result = _repository.FindBy<UserPlant>(up => myPlantIds.Contains(up.PlantId))
                .Select(up => up.User)
                .Distinct()
                .ApplySort(sortBy, isDescending, _userPropertyMappingService.PropertyMappings)             
                .ToPagedList(pageNumber, pageSize);

            var users = Mapper.Map<PagedList<User>, PagedList<UserListDto>>(result);
            return Ok(users);
        }

        /// <summary>
        /// Searches a user by first name, last name, user name, plant id or role name
        /// </summary>
        /// <param name="search">The search string</param>        
        /// <param name="plantId">The plant id</param>        
        /// <param name="roleName">The role name</param>        
        /// <returns>A list of users</returns>
        /// <response code="200">Returns the user list</response>
        /// <response code="400">If the search string is null or empty</response>
        [HttpGet]
        [Authorize(Policy = UserRole.eSuite_Administration_User_Read)]
        [Route("search")]
        [ProducesResponseType(typeof(IEnumerable<UserListDto>), (int)HttpStatusCode.OK)]
        public IActionResult Search(string search, int? plantId, string roleName)
        {            
            var users = _repository.FindBy<User>(u => !u.IsDeleted);
            
            if(!string.IsNullOrEmpty(search))
            {
                users = users.Where(u => u.UserName.Contains(search) || u.FirstName.Contains(search) || u.LastName.Contains(search));
            }

            if(plantId.HasValue)
            {
                users = users.Where(u => u.Plants.Any(p => p.PlantId == plantId));
            }

            if(!string.IsNullOrEmpty(roleName))
            {
                users = users.Where(u => 
                    u.UserGroups.SelectMany(ug => ug.ApplicationUserGroup.UserGroupRoles)
                        .Any(ugr => ugr.Role.Name == roleName));
            }

            var result = Mapper.Map<IEnumerable<User>, IEnumerable<UserListDto>>(users);
            return Ok(result);
        }

        /// <summary>
        /// Get a user
        /// </summary>
        /// <param name="id">The id of the user</param>
        /// <returns>An user</returns>
        /// <response code="200">Returns the user</response>
        /// <response code="404">If the user is not found</response>
        [HttpGet]
        [Authorize(Policy = UserRole.eSuite_Administration_User_Read)]
        [ProducesResponseType(typeof(UserGetDto), (int)HttpStatusCode.OK)]
        [Route("{id}", Name = "GetUser")]
        public IActionResult GetById(int id)
        {
            var user = _repository.FindBy<User>(u => u.Id == id)
                .Include(u => u.UserGroups)
                .ThenInclude(ug => ug.ApplicationUserGroup)
                .ThenInclude(aug => aug.Application)
                .Include(u => u.Plants)
                .ThenInclude(up => up.Plant)
                .FirstOrDefault();

            if(user == null)
            {
                return NotFound();
            }

            var result = Mapper.Map<User, UserGetDto>(user);
            return Ok(result);
        }

        /// <summary>
        /// Creates a user
        /// </summary>
        /// <param name="user">The user</param>
        /// <returns>Id of the user</returns>
        /// <response code="201">Returns the user's id</response>
        /// <response code="400">If user is invalid</response>
        /// <response code="409">If the user already exists</response>
        [HttpPost]
        [Authorize(Policy = UserRole.eSuite_Administration_User_Write)]
        [ValidationFilter]
        [ProducesResponseType(typeof(int), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> Create([FromBody]User user)
        {
            var userEntity = await _repository.FindBy<User>(u => u.UserName == user.UserName).FirstOrDefaultAsync();
            if (userEntity == null)
            {
                _repository.Add(user);
            }
            else 
            {
                if (userEntity.IsDeleted)
                {
                    userEntity.IsDeleted = false;
                    _repository.Update(userEntity);
                    user = userEntity;
                }
                else 
                {
                    return StatusCode((int)HttpStatusCode.Conflict);
                }
            }

            _repository.Save();
            await _userService.PublishSaveEventAsync(user.Id);
            
            return CreatedAtRoute("GetUser", new { id = user.Id }, Mapper.Map<User, UserGetDto>(user));
        }

        /// <summary>
        /// Updates a user
        /// </summary>
        /// <param name="user">The user</param>
        /// <returns></returns>
        /// <response code="204"></response>
        /// <response code="400">If user is invalid</response>
        /// <response code="404">If the user is not found</response>
        [HttpPut]
        [Authorize(Policy = UserRole.eSuite_Administration_User_Write)]
        [ValidationFilter]
        [ProducesResponseType(typeof(void), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> Update([FromBody]User user)
        {            
            var dbUser = _repository.FindBy<User>(u => u.Id == user.Id)
                .Include(u => u.UserGroups)
                .Include(u => u.Plants)
                .FirstOrDefault();
            if(dbUser == null)
            {
                return NotFound();
            }

            dbUser.Email = user.Email;
            dbUser.FirstName = user.FirstName;
            dbUser.LastName = user.LastName;
            _repository.UpdateManyToMany(dbUser.UserGroups, user.UserGroups, ug => ug.ApplicationUserGroupId);
            _repository.UpdateManyToMany(dbUser.Plants, user.Plants, up => up.PlantId);

            _repository.Update(dbUser);
            _repository.Save();

            await _userService.PublishSaveEventAsync(dbUser.Id);

            return NoContent();
        }

        /// <summary>
        /// Imports users
        /// </summary>
        /// <param name="file">The users in xlsx file</param>
        /// <response code="200"></response>
        /// <response code="400">If file is invalid</response>        
        [HttpPost("import")]
        [Authorize(Policy = UserRole.eSuite_Administration_User_Write)]        
        [ProducesResponseType(typeof(ImportResult), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> Import(IFormFile file)
        {
            var invalidFile = _usersImportService.ValidateFile(file);
            if(!string.IsNullOrWhiteSpace(invalidFile))
            {
                return BadRequest(invalidFile);
            }
            
            var result = await _usersImportService.Import(file);
            return Ok(result);
        }

        /// <summary>
        /// Deletes a user
        /// </summary>
        /// <param name="id">The id of the user</param>
        /// <returns></returns>
        /// <response code="204"></response>
        /// <response code="404">If the user is not found</response>
        [HttpDelete("{id}")]
        [Authorize(Policy = UserRole.eSuite_Administration_User_Write)]
        [ProducesResponseType(typeof(void), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> Delete(int id)
        {            
            var dbUser = _repository.GetById<User>(id);
            if(dbUser == null)
            {
                return NotFound();
            }

            dbUser.IsDeleted = true;

            _repository.Update(dbUser);
            _repository.Save();

            await _userService.PublishSaveEventAsync(dbUser.Id);

            return NoContent();
        }
    }
}