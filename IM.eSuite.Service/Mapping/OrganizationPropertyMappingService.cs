using System;
using System.Collections.Generic;
using System.Linq;
using IM.DotNet.Linq;

namespace IM.eSuite.Service
{
    public class OrganizationPropertyMappingService: AbstractPropertyMappingService, IOrganizationPropertyMappingService
    {
        private static IDictionary<string, PropertyMappingValue> _organizationMapping =
           new Dictionary<string, PropertyMappingValue>(StringComparer.OrdinalIgnoreCase)
           {
               { "Id", new PropertyMappingValue(new string[] { "Id" } )},
               { "Name", new PropertyMappingValue(new string[] { "Name" } )}                        
           };

        public OrganizationPropertyMappingService(): base(_organizationMapping)
        {
        }
    }
}