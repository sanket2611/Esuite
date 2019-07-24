using IM.eSuite.Domain;

namespace IM.eSuite.Service
{
    public class PlantSearchRequest
    {
        /// <value>Country Id</value>
        public int? CountryId { get; set; }

        /// <value>Delegation Id</value>
        public int? DelegationId { get; set; }

        ///<value>Sector Id</value>
        public int? SectorId { get; set; }

        ///<value>Business unit Id</value>
        public int? BusinessUnitId { get; set; } 
        ///<value>SOA Id</value>
        public int? SOAId { get; set; }
    }
}