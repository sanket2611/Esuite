using System;
using System.Collections.Generic;
using System.Linq;
using IM.DotNet.Linq;

namespace IM.eSuite.Service
{
    public class UserPropertyMappingService: AbstractPropertyMappingService, IUserPropertyMappingService
    {
        private static IDictionary<string, PropertyMappingValue> _userMapping =
           new Dictionary<string, PropertyMappingValue>(StringComparer.OrdinalIgnoreCase)
           {
               { "Id", new PropertyMappingValue(new string[] { "Id" } )},
               { "Email", new PropertyMappingValue(new string[] { "Email" } )},
               { "FirstName", new PropertyMappingValue(new string[] { "FirstName"}) },
               { "LastName", new PropertyMappingValue(new string[] { "LastName"}) },
               { "UserName", new PropertyMappingValue(new string[] { "UserName"}) }               
           };

        public UserPropertyMappingService(): base(_userMapping)
        {
        }
    }
}