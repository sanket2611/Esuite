using IM.NETCore.Domain;

namespace IM.eSuite.Domain
{
    public class UserGroupUser
    {
        public int UserId { get; set; }
        public int ApplicationUserGroupId { get; set; }

        // Navigation properties
        public virtual User User { get; set; }
        public virtual ApplicationUserGroup ApplicationUserGroup { get; set; }
    }
}