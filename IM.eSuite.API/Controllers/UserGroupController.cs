using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using IM.NETCore.Core.Linq;
using System.Linq;
using System.Net;
using System.Collections.Generic;
using IM.eSuite.API.Dto;
using IM.eSuite.Domain;
using AutoMapper;

namespace IM.eSuite.API.Controllers
{
    [Route("api/[controller]")]
    public class UserGroupController : Controller
    {
        private readonly IRepository<DbContext> _repository;
        public UserGroupController(IRepository<DbContext> repository)
        {
            _repository = repository;
        }

        /// <summary>
        /// Get user groups by application
        /// </summary>        
        /// <returns>A list of application user groups</returns>
        /// <response code="200">Returns the user groups by application</response>
        [HttpGet]
        [Authorize(Policy = UserRole.eSuite_Administration_UserGroup_Read)]
        [Route("getByApplication")]
        [ProducesResponseType(typeof(IEnumerable<ApplicationGetDto>), (int)HttpStatusCode.OK)]
        public IActionResult GetByApplication()
        {
            var query = _repository.GetAll<Application>()
                .Include(a => a.UserGroups);
            var userGroups = Mapper.Map<IEnumerable<Application>, IEnumerable<ApplicationGetDto>>(query);                
            return Ok(userGroups);
        }
    }
}