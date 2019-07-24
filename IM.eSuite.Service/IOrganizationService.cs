using System.Collections.Generic;
using System.Threading.Tasks;
using IM.eSuite.Domain;

namespace IM.eSuite.Service
{
    public interface IOrganizationService
    {        
        Task PublishSaveEventAsync(Organization organization);
    }
}
