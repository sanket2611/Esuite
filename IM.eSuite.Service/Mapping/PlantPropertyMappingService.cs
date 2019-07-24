using System;
using System.Collections.Generic;
using System.Linq;
using IM.DotNet.Linq;

namespace IM.eSuite.Service
{
    public class PlantPropertyMappingService: AbstractPropertyMappingService, IPlantPropertyMappingService
    {
        private static IDictionary<string, PropertyMappingValue> _plantMapping =
           new Dictionary<string, PropertyMappingValue>(StringComparer.OrdinalIgnoreCase)
           {
               { "Id", new PropertyMappingValue(new string[] { "Id" } )},
               { "Name", new PropertyMappingValue(new string[] { "Name" } )},
               { "GaiaCode", new PropertyMappingValue(new string[] { "GaiaCode"}) }               
           };

        public PlantPropertyMappingService(): base(_plantMapping)
        {
        }
    }
}