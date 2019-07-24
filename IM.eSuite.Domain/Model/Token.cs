using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IM.eSuite.Domain
{
    public class Token
    {
        [Key]
        public int UserId { get; set; }
        [Required]
        [MaxLength]
        public string Value { get; set; }
        public DateTime ExpirationDate { get; set; }
        // Navigation properties
        [Required]
        [ForeignKey("UserId")]
        public virtual User User { get; set; }
    }
}