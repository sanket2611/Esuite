using IM.eSuite.Domain;

namespace IM.eSuite.API.Dto
{
    public class PlantGetDto : PlantListDto
    {
        public int CountryId { get; set; }
        public int SOAId { get; set; }
        public CountryGetDto Country { get; set; }
        public SOAGetDto SOA { get; set; }
    }
}