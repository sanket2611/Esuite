using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Net;
using IM.eSuite.Service;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace IM.eSuite.API.Controllers
{
    [Route("api/[controller]")]
    public class DirectoryController : Controller
    {
        private readonly IDirectoryApiService _directoryService;
        public DirectoryController(IDirectoryApiService directoryService)
        {
            _directoryService = directoryService;
        }

        /// <summary>
        /// Get user by SGID. Calls the Directory API.
        /// </summary>
        /// <param name="sgId">SGId of the user</param>
        /// <returns>The user from directory</returns>
        /// <response code="200">Returns the user</response>
        /// <response code="400">If SGId is invalid</response>
        /// <response code="404">If the user is not found</response>
        [HttpGet]
        [Authorize]
        [Route("getUserBySGId/{sgId}")]
        [ProducesResponseType(typeof(DirectoryApiUser), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetUserBySGId(string sgId)
        {
            if(string.IsNullOrWhiteSpace(sgId))
            {
                return BadRequest();
            }

            var user = await _directoryService.GetUserBySGId(sgId);

            if(user == null)
            {
                return NotFound();
            }
                
            return Ok(user);
        }

        /// <summary>
        /// Get emails by name. Calls the Directory API.
        /// </summary>
        /// <param name="name">First name or last name of the user</param>
        /// <returns>The emails from directory</returns>
        /// <response code="200">Returns the user</response>
        /// <response code="400">If name is invalid</response>        
        [HttpGet]
        [Authorize]
        [Route("getEmailByName/{name}")]
        [ProducesResponseType(typeof(IEnumerable<string>), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetEmailByName(string name)
        {
            if(string.IsNullOrWhiteSpace(name))
            {
                return BadRequest();
            }

            var emails = await _directoryService.GetEmailByName(name);            
                
            return Ok(emails);
        }
    }
}