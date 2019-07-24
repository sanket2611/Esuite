using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace IM.eSuite.Service
{
    public interface IAuthenticationService
    {
        Task<IActionResult> Authenticate(string authorizationCode);
        Task<IActionResult> RefreshToken(string sgId);
        Task<IActionResult> LogOut(string accessToken);
    }
}
