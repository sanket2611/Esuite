using System.Threading.Tasks;
using IM.eSuite.Domain;
using IM.NETCore.Core.Linq;
using Microsoft.EntityFrameworkCore;
using RawRabbit;
using IM.eSuite.Common;
using System.Linq;
using System.Collections.Generic;

namespace IM.eSuite.Service
{
    public class PlantService : IPlantService
    {
        private readonly IRepository<DbContext> _repository;
        private readonly IBusClient _busClient;

        public PlantService(IRepository<DbContext> repository, IBusClient busClient)
        {
            _repository = repository;
            _busClient = busClient;
        }
        public bool IsExisting(Plant plant)
        {
            return _repository.FindBy<Plant>(p => p.GaiaCode == plant.GaiaCode &  p.Id != plant.Id)
                .Any();
        }

        public IEnumerable<Plant> Search(PlantSearchRequest request)
        {
            var plants = _repository.FindBy<Plant>(p => !p.IsDeleted);

            if(request.DelegationId.HasValue){
                plants = plants.Where(p => p.Country.DelegationId == request.DelegationId.Value);
            }

            if(request.CountryId.HasValue){
                plants = plants.Where(p => p.CountryId == request.CountryId.Value);
            }

            if(request.SectorId.HasValue){
                plants = plants.Where(p => p.SOA.BusinessUnit.SectorId == request.SectorId.Value);
            }

            if(request.BusinessUnitId.HasValue){
                plants = plants.Where(p => p.SOA.BusinessUnitId == request.BusinessUnitId.Value);
            }

            if(request.SOAId.HasValue){
                plants = plants.Where(p => p.SOAId == request.SOAId.Value);
            }

            return plants;
        }

        public async Task PublishSaveEventAsync(Plant plant)
        {
            var e = new PlantSaved {
                Id = plant.Id,
                Name = plant.Name,
                GaiaCode = plant.GaiaCode,
                CountryId = plant.CountryId,
                SOAId = plant.SOAId,
                IsDeleted = plant.IsDeleted
            };

            await _busClient.PublishAsync<PlantSaved>(e);
        }
    }
}