using System.Collections.Generic;
using System.Threading.Tasks;
using IM.eSuite.Domain;

namespace IM.eSuite.Service
{
    public interface IPlantService
    {
        bool IsExisting(Plant plant);
        IEnumerable<Plant> Search(PlantSearchRequest request);
        Task PublishSaveEventAsync(Plant plant);
    }
}
