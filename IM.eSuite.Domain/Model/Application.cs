using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using IM.NETCore.Domain;

namespace IM.eSuite.Domain
{
    public class Application : EntityBase
    {
        [Required]
        [MaxLength(50)]
        public string Name { get; set; }
        public virtual ICollection<ApplicationUserGroup> UserGroups { get; set; }
    }
}