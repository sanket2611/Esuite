using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Security.Principal;
using IM.NETCore.Domain;

namespace IM.eSuite.Domain
{
    public class User : EntityBase, IIdentity
    {
        [Required]
        [MaxLength(50)]
        public string UserName { get; set; }

        [Required]
        [MaxLength(50)]
        public string FirstName { get; set; }

        [Required]
        [MaxLength(50)]
        public string LastName { get; set; }

        
        [EmailAddress]
        [MaxLength(200)]
        public string Email { get; set; }

        public bool IsDeleted { get; set; }

        public virtual ICollection<UserGroupUser> UserGroups { get; set; }
        public virtual ICollection<UserPlant> Plants { get; set; }

        public virtual Token Token { get;set; }

        // IIdentity
        public string Name => UserName;
        public virtual string AuthenticationType => null;
        public bool IsAuthenticated => true;
    }
}