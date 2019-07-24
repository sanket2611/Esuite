using RawRabbit.Configuration.Exchange;
using RawRabbit.Enrichers.Attributes;

namespace IM.eSuite.Common
{
    [Exchange(Name = ExchangeName.OrganizationExchange, Type = ExchangeType.Fanout)]
    public class OrganizationSaved
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int? ParentId { get; set; }
        public int? PlantId { get; set; }
        public bool IsDeleted { get; set; }
        public OrganizationLevelType Type { get; set; }
    }
}