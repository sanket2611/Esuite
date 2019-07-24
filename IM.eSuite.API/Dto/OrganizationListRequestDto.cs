using IM.eSuite.Domain;

namespace IM.eSuite.API.Dto
{
    public class OrganizationListRequestDto : ListRequestDto
    {
        /// <value>Organization parent id</value>
        public int? ParentId { get; set; }

        /// <value>Plant id</value>
        public int? PlantId { get; set; }
    }
}