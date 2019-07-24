using System.Collections.Generic;
using System.Threading.Tasks;

namespace IM.eSuite.Service
{
    public interface IDirectoryApiService
    {
        Task<DirectoryApiUser> GetUserBySGId(string sgId);
        Task<IEnumerable<string>> GetEmailByName(string name);
    }
}