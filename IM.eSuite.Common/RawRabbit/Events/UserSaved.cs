using System.Collections.Generic;
using RawRabbit.Configuration.Exchange;
using RawRabbit.Enrichers.Attributes;

namespace IM.eSuite.Common
{
    [Exchange(Name = ExchangeName.UserExchange, Type = ExchangeType.Fanout)]
    public class UserSaved
    {
        public int Id { get; set; }        
        public string UserName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public bool IsDeleted { get; set; }
        public UserGroupSaved[] Groups { get; set; }
        public UserPlantSaved[] Plants { get; set; }
    }

    public class UserGroupSaved
    {
        public int Id { get; set; }
        public string UserGroupName { get; set; }
        public int ApplicationId { get; set; }
    }

    public class UserPlantSaved
    {
        public int  UserId { get; set; }
        public int  PlantId { get; set; }
    }
}