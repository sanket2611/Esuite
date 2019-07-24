using System.Threading.Tasks;
using IM.eSuite.Domain;
using RawRabbit;
using IM.eSuite.Common;

namespace IM.eSuite.Service
{
    public class OrganizationService : IOrganizationService
    {
        private readonly IBusClient _busClient;

        public OrganizationService(IBusClient busClient)
        {
            _busClient = busClient;
        }
        public async Task PublishSaveEventAsync(Organization organization)
        {
            var e = new OrganizationSaved {
                Id = organization.Id,
                Name = organization.Name,                
                Type = organization.Type,
                ParentId = organization.ParentId,
                PlantId = organization.PlantId,
                IsDeleted = organization.IsDeleted,
            };

            await _busClient.PublishAsync<OrganizationSaved>(e);
        }
    }
}