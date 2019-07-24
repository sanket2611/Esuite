using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using IM.NETCore.Domain;

namespace IM.eSuite.Domain
{
    public class SOA : EntityBase
    {
        [Required]
        [MaxLength(50)]
        public string Name { get; set; }
        public int BusinessUnitId { get; set; }
        public virtual BusinessUnit BusinessUnit { get; set; }
        public virtual ICollection<Plant> Plants { get; set; }
    }
}