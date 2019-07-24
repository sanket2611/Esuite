using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using IM.NETCore.Domain;

namespace IM.eSuite.Domain
{
    public class BusinessUnit : EntityBase
    {
        [Required]
        [MaxLength(50)]
        public string Name { get; set; }
        public int SectorId { get; set; }
        public virtual Sector Sector { get; set; }
        public virtual ICollection<SOA> SOAs { get; set; }
    }
}