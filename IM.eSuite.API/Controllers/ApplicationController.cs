using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using IM.NETCore.Core.Linq;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using IM.eSuite.API.Dto;
using IM.eSuite.Domain;
using AutoMapper;

namespace IM.eSuite.API.Controllers
{
    [Route("api/[controller]")]
    public class ApplicationController : Controller
    {
        private readonly IRepository<DbContext> _repository;
        public ApplicationController(IRepository<DbContext> repository)
        {
            _repository = repository;
        }

        /// <summary>
        /// Get the list of applications for authenticated user
        /// </summary>        
        /// <returns>An array of applications</returns>
        /// <response code="200">Returns the array of user's applications</response>
        [HttpGet]
        [Authorize(Policy = UserRole.eSuite_Application_Read)]
        [Route("get")]
        [ProducesResponseType(typeof(IEnumerable<ApplicationListDto>), (int)HttpStatusCode.OK)]
        public IActionResult Get()
        {
            var sgId = User.Identity.Name;
            var query = _repository.FindBy<User>(u => u.UserName == sgId)
                .Include(u => u.UserGroups)
                .ThenInclude(ug => ug.ApplicationUserGroup)
                .ThenInclude(aug => aug.Application)
                .SelectMany(u => u.UserGroups)
                .Select(ug => ug.ApplicationUserGroup.Application)
                .Distinct();
            
            var applications = Mapper.Map<IEnumerable<Application>, IEnumerable<ApplicationListDto>>(query);                
            return Ok(applications);
        }
    }
}