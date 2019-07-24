using System.Collections.Generic;
using System.Linq;
using IM.eSuite.Domain;

namespace IM.eSuite.API.Dto
{
    public class ApplicationGetDto : ApplicationListDto
    {
        public IEnumerable<ApplicationUserGroupListDto> UserGroups {get; set;}
    }
}