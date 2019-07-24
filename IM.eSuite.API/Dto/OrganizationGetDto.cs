using IM.eSuite.Domain;

namespace IM.eSuite.API.Dto
{
    public class OrganizationGetDto : OrganizationListDto
    {
        public int? ParentId { get; set; }
        public OrganizationGetDto Parent {get; set;}
    }
}