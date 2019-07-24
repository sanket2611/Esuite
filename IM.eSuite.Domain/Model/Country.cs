using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using IM.NETCore.Domain;

namespace IM.eSuite.Domain
{
    public class Country : EntityBase
    {
        [Required]
        [MaxLength(50)]
        public string Name { get; set; }

        public int DelegationId { get; set; }

        public virtual Delegation Delegation { get; set; }
        public virtual ICollection<Plant> Plants { get; set; }
    }
}