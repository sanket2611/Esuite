using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using IM.NETCore.Domain;

namespace IM.eSuite.Domain
{
    public class Role : EntityBase
    {
        [Required]
        [MaxLength(50)]        
        public string Name { get; set; }
        
        // Navigation properties
        public virtual ICollection<ApplicationUserGroupRole> ApplicationUserGroupRoles { get; set; }
    }
}