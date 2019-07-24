using System.Threading.Tasks;
using IM.eSuite.Domain;

namespace IM.eSuite.Service
{
    public interface IUserService
    {        
        Task PublishSaveEventAsync(int userId);
    }
}