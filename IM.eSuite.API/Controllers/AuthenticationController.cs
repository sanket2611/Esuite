using System.Linq;
using System.Threading.Tasks;
using System.Net;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using IM.NETCore.Web.Dto;
using IM.NETCore.Web.OAuth;
using IM.eSuite.API.Dto;
using IM.eSuite.Service;

namespace IM.eSuite.API.Controllers
{
    [Route("api/[controller]")]
    public class AuthenticationController : Controller
    {
        private readonly IAuthenticationService _authenticationService;

        public AuthenticationController(IAuthenticationService authenticationService)
        {
            _authenticationService = authenticationService;
        }

        /// <summary>
        /// Authenticates an user based on its authorizaton code.
        /// </summary>        
        /// <param name="authorizationCode"></param>
        /// <returns>A user, JWT token and roles</returns>
        /// <response code="200">Returns the user, JWT token and roles</response>
        /// <response code="401">If the authentication failed</response>
        /// <response code="404">If the user is not in the database</response>
        [HttpPost]
        [AllowAnonymous]        
        [Route("authenticate")]
        [ProducesResponseType(typeof(UserAuthenticationDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> Authenticate([FromBody] CodeDto authorizationCode)
        {
            return await _authenticationService.Authenticate(authorizationCode.Code);
        }

        /// <summary>
        /// Refreshes the user's access token
        /// </summary>
        /// <returns>A user, JWT token and roles</returns>
        /// <response code="200">Returns the user, JWT token and roles</response>
        /// <response code="400">If the refresh token operation failed</response>
        /// <response code="401">If the JWT token is not provided/valid in HTTP header</response>
        /// <response code="404">If the refresh token was not found in the database</response>
        [HttpPost]
        [Authorize]        
        [Route("refresh-token")]
        [ProducesResponseType(typeof(UserAuthenticationDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> RefreshToken()
        {
            var sgId = User.Identity.Name;
            return await _authenticationService.RefreshToken(sgId);
        }
        
        /// <summary>
        /// Log the user out
        /// </summary>
        /// <returns></returns>
        /// <response code="200">If the user was successfully logged out</response>
        /// <response code="400">If the access token is null or empty</response>
        /// <response code="401">If the JWT token is not provided/valid in HTTP header</response>       
        [HttpPost]
        [Authorize]
        [Route("logout")]
        [ProducesResponseType(typeof(void), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> LogOut()
        {
            var accessTokenClaim = User.Claims.FirstOrDefault(c => c.Type == OAuthClaimNames.AccessToken);
            return await _authenticationService.LogOut(accessTokenClaim?.Value);
        }
    }
}