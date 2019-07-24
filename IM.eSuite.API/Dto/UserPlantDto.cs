using System.Collections.Generic;
using System.Linq;
using IM.eSuite.Domain;

namespace IM.eSuite.API.Dto
{
    public class UserPlantDto
    {
        public int UserId { get; set; }
        public int PlantId { get; set; }
        public PlantListDto Plant { get; set; }
    }
}