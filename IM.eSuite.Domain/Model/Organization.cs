using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using IM.NETCore.Domain;
using IM.eSuite.Common;

namespace IM.eSuite.Domain
{
    public class Organization : EntityBase
    {
        /// <summary>
        /// Name of the organization
        /// </summary>
        [Required]
        public string Name { get; set; }

        /// <summary>
        /// Organization parent Id
        /// </summary>       
        public int? ParentId { get; set; }

        /// <summary>
        /// Plant Id
        /// </summary>
        public int? PlantId { get; set; }

        /// <summary>
        /// Flag indicating wether organization is deleted or not.
        /// </summary>
        public bool IsDeleted { get; set; }

        /// <summary>
        /// Organization level object
        /// </summary>
        public OrganizationLevelType Type { get; set; }

        /// <summary>
        /// Organization parent object
        /// </summary>        
        public virtual Organization Parent { get; set; }

        /// <summary>
        /// Organization plant object
        /// </summary>        
        public virtual Plant Plant { get; set; }

        /// <summary>
        /// Sub organization list
        /// </summary>
        public virtual ICollection<Organization> SubOrganizations { get; set; }
    }
}