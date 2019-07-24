using System.Linq;
using System.Threading.Tasks;
using IM.NETCore.Core.Linq;
using IM.NETCore.Web.Dto;
using IM.NETCore.Web.Jwt;
using IM.NETCore.Web.OAuth;
using IM.NETCore.Web.Authentication;
using IM.eSuite.Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.Security.Claims;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;

namespace IM.eSuite.Service
{
    public class AuthenticationService: IAuthenticationService
    {               
        private readonly IRepository<DbContext> _repository;
        private readonly IOAuthService _oAuthService;
        private readonly IJwtService _jwtService;
        private readonly IOAuthAuthenticationService _oAuthAuthenticationService;
        private readonly ILogger _logger;

        public AuthenticationService(IRepository<DbContext> repository, 
            IOAuthService oAuthService,
            IJwtService jwtService,
            IOAuthAuthenticationService oAuthAuthenticationService,
            ILogger<AuthenticationService> logger)
        {
            _repository = repository;
            _oAuthService = oAuthService;
            _jwtService = jwtService;
            _oAuthAuthenticationService = oAuthAuthenticationService;
            _logger = logger;
        }

        public async Task<IActionResult> Authenticate(string authorizationCode)
        {
            _logger.LogDebug($"Authentication requested with authorization code {authorizationCode}");

            var accessTokenResponse = await _oAuthService.ValidateAuthoriztionCode(authorizationCode);
            if(accessTokenResponse == null)
            {
                _logger.LogError($"Validation of authorization code failed for code {authorizationCode}.");
                return new UnauthorizedResult();
            }
            
            var tokenInfoResponse = await _oAuthService.GetTokenInfo(accessTokenResponse.Access_Token);
            if(tokenInfoResponse == null)
            {
                _logger.LogError($"Unable to get token info for code {authorizationCode}.");
                return new UnauthorizedResult();
            }

            _logger.LogDebug($"Retrieved SGId: {tokenInfoResponse.StGoSGI}");

            var user = _repository.FindBy<User>(u => u.UserName == tokenInfoResponse.StGoSGI)
                .Include(u => u.Token)
                .Include(u => u.UserGroups)
                .ThenInclude(ug => ug.ApplicationUserGroup)
                .ThenInclude(aug => aug.UserGroupRoles)
                .ThenInclude(augr => augr.Role)
                .FirstOrDefault();
            
            if(user == null)
            {
                _logger.LogWarning($"SGId {tokenInfoResponse.StGoSGI} has not been found in the database");
                return new NotFoundObjectResult($"User with SGID {tokenInfoResponse.StGoSGI} doesn't exist in the database.");
            }            

            if(string.IsNullOrWhiteSpace(accessTokenResponse.Refresh_Token))
            {
                _logger.LogWarning($"SGId {tokenInfoResponse.StGoSGI} has no refresh token.");
            }
            else
            {
                if(user.Token == null)
                {
                    user.Token = new Token();
                }
                user.Token.Value = accessTokenResponse.Refresh_Token;
                _repository.Save();
            }

            return returnTokenAndUserData(tokenInfoResponse, user);
        }

        public async Task<IActionResult> RefreshToken(string sgId)
        {
            _logger.LogDebug($"Refresh token has been requested for SGId {sgId}");

            var refreshToken = _repository.FindBy<Token>(t => t.User.UserName == sgId)
                .Include(t => t.User)
                .ThenInclude(u => u.UserGroups)
                .ThenInclude(ug => ug.ApplicationUserGroup)
                .ThenInclude(aug => aug.UserGroupRoles)
                .ThenInclude(augr => augr.Role)
                .FirstOrDefault();

            if(refreshToken == null || string.IsNullOrEmpty(refreshToken.Value))
            {
                _logger.LogWarning($"Refresh token has not been found for SGId {sgId}");
                return new NotFoundObjectResult($"Refresh token not found for SGID {sgId}");
            }

            var accessTokenResponse = await _oAuthService.RefreshToken(refreshToken.Value);

            if(accessTokenResponse == null){
                return new BadRequestObjectResult("Cannot refresh token.");
            }

            if(string.IsNullOrWhiteSpace(accessTokenResponse.Refresh_Token))
            {
                _logger.LogWarning($"SGId {sgId} has no refresh token.");
            }
            else
            {
                refreshToken.Value = accessTokenResponse.Refresh_Token;
                _repository.Save();
            }

            var tokenInfo = new TokenInfoResponseDto
            {
                Access_Token = accessTokenResponse.Access_Token,
                Expires_In = accessTokenResponse.Expires_In,
                StGoSGI = sgId
            };

            return returnTokenAndUserData(tokenInfo, refreshToken.User);            
        }

        public async Task<IActionResult> LogOut(string accessToken)
        {
            return await _oAuthAuthenticationService.LogOut(accessToken);
        }
        
        private IActionResult returnTokenAndUserData(TokenInfoResponseDto tokenInfo, User user)
        {
            var claims = new List<Claim>{
                new Claim(JwtRegisteredClaimNames.Sub, tokenInfo.StGoSGI),
                new Claim(JwtRegisteredClaimNames.UniqueName, tokenInfo.StGoSGI),
                new Claim(OAuthClaimNames.AccessToken, tokenInfo.Access_Token)                
            };

            var roleClaims = user.UserGroups
                .Select(ug => ug.ApplicationUserGroup)
                .SelectMany(aug => aug.UserGroupRoles)
                .Select(r => new Claim(r.Role.Name, true.ToString()));
            
            claims.AddRange(roleClaims);

            var jwt = _jwtService.CreateJwt(tokenInfo, claims);
            var token = _jwtService.WriteToken(jwt);
            
            // We return user's informations
            return new OkObjectResult(new UserAuthenticationDto
            {
                UserName = tokenInfo.StGoSGI,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Token = new TokenDto
                {
                    Value = token,
                    ExpirationDate = jwt.ValidTo
                },
                UserGroup = new UserGroupDto
                {
                    Roles = user.UserGroups.Select(ug => ug.ApplicationUserGroup)
                        .SelectMany(aug => aug.UserGroupRoles)
                        .Select(r => new RoleDto { 
                            Id = r.Role.Id, 
                            Name = r.Role.Name 
                        }
                    )
                }            
            });
        }
    }
}