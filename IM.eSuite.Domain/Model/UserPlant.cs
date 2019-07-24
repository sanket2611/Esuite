using IM.NETCore.Domain;

namespace IM.eSuite.Domain
{
    public class UserPlant
    {
        public int UserId { get; set; }
        public int PlantId { get; set; }

        // Navigation properties
        public virtual User User { get; set; }
        public virtual Plant Plant { get; set; }
    }
}