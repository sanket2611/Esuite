using IM.eSuite.Domain;

namespace IM.eSuite.API.Dto
{
    public class ApplicationUserGroupListDto
    {
        public int Id { get; set; }
        public string Name {get; set; }
        public int ApplicationId {get; set; }
    }
}