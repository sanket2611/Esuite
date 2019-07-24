using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using IM.NETCore.Domain;

namespace IM.eSuite.Domain
{
    public class Plant : EntityBase
    {
        /// <summary>
        /// Name of the plant.
        /// </summary>
        [Required]
        [MaxLength(100)]
        public string Name { get; set; }

        /// <summary>
        /// Gaia code of the plant.
        /// </summary>
        [Required]
        [MinLength(6)]
        [MaxLength(6)]
        public string GaiaCode { get; set; }

        /// <summary>
        /// Country id of the plant.
        /// </summary>
        public int CountryId { get; set; }

        /// <summary>
        /// SOA id of the plant.
        /// </summary>
        public int SOAId { get; set; }

        /// <summary>
        /// Flag indicating wether plant is deleted or not.
        /// </summary>
        public bool IsDeleted { get; set; }

        /// <summary>
        /// Plant's country
        /// </summary>
        public virtual Country Country { get; set; }

        /// <summary>
        /// Plant's SOA
        /// </summary>
        public virtual SOA SOA { get; set; }

        /// <summary>
        /// Plant's departments
        /// </summary>
        public virtual ICollection<Organization> Departments { get; set; }

        /// <summary>
        /// Plant's users
        /// </summary>
        public virtual ICollection<UserPlant> Users { get; set; }
    }
}