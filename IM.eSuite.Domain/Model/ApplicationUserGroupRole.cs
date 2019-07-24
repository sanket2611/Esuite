using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using IM.NETCore.Domain;

namespace IM.eSuite.Domain
{
    public class ApplicationUserGroupRole
    {
        [Column(Order = 1)]
        public int ApplicationUserGroupId { get; set; }
        
        [Column(Order = 2)]
        public int RoleId { get; set; }

        // Navigation properties        
        public virtual ApplicationUserGroup ApplicationUserGroup { get; set; }
        
        public virtual Role Role { get; set; }
    }
}