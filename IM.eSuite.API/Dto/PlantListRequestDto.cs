using IM.eSuite.Domain;

namespace IM.eSuite.API.Dto
{
    public class PlantListRequestDto : ListRequestDto
    {
        /// <value>Search string</value>
        public string Search { get; set; }
    }
}