using System.Collections.Generic;
using System.Linq;
using IM.eSuite.Domain;

namespace IM.eSuite.API.Dto
{
    public class UserGroupDto
    {
        public int UserId { get; set; }
        public int ApplicationUserGroupId { get; set; }
        public ApplicationUserGroupDto ApplicationUserGroup { get; set; }
    }
}