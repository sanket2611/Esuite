using IM.eSuite.Domain;

namespace IM.eSuite.API.Dto
{
    public class SOAGetDto: SOAListDto
    {
        public int BusinessUnitId { get; set; }
        public BusinessUnitGetDto BusinessUnit { get; set; }
    }
}