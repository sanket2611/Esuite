using System.Collections.Generic;
using System.Linq;
using IM.eSuite.Domain;

namespace IM.eSuite.API.Dto
{
    public class UserGetDto: UserListDto
    {
        public IEnumerable<UserGroupDto> UserGroups { get; set; }
        public IEnumerable<UserPlantDto> Plants { get; set; }
    }
}