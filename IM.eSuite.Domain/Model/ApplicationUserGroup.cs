using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using IM.NETCore.Domain;

namespace IM.eSuite.Domain
{
    public class ApplicationUserGroup: EntityBase
    {
        [Required]
        [MaxLength(50)]
        public string Name { get; set; }        

        public int ApplicationId { get; set; }
        
        // Navigation properties        
        public virtual ICollection<UserGroupUser> Users { get; set; }
        public virtual ICollection<ApplicationUserGroupRole> UserGroupRoles { get; set; }
        public virtual Application Application { get; set; }
    }
}