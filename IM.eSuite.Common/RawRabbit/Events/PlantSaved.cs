using RawRabbit.Configuration.Exchange;
using RawRabbit.Enrichers.Attributes;

namespace IM.eSuite.Common
{
    [Exchange(Name = ExchangeName.PlantExchange, Type = ExchangeType.Fanout)]
    public class PlantSaved
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string GaiaCode { get; set; }
        public int CountryId { get; set; }
        public int SOAId { get; set; }
        public bool IsDeleted { get; set; }
    }
}