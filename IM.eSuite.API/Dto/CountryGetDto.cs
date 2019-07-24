using IM.eSuite.Domain;

namespace IM.eSuite.API.Dto
{
    public class CountryGetDto: CountryListDto
    {
        public int DelegationId { get; set; }
    }
}