using IM.eSuite.Domain;

namespace IM.eSuite.API.Dto
{
    public class BusinessUnitGetDto: BusinessUnitListDto
    {
        public int SectorId { get; set; }
    }
}