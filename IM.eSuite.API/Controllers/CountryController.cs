using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using IM.NETCore.Core.Linq;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using IM.eSuite.API.Dto;
using IM.eSuite.Domain;
using AutoMapper;

namespace IM.eSuite.API.Controllers
{
    [Route("api/[controller]")]
    public class CountryController : Controller
    {
        private readonly IRepository<DbContext> _repository;
        public CountryController(IRepository<DbContext> repository)
        {
            _repository = repository;
        }

        /// <summary>
        /// Searches a country by name
        /// </summary>        
        /// <param name="search">The search string</param>
        /// <param name="delegationId">The delegation id</param>
        /// <returns>A list of countries</returns>
        /// <response code="200">Returns the countries list</response>        
        [HttpGet]
        [Authorize(Policy = UserRole.eSuite_MasterData_Country_Read)]
        [Route("search")]
        [ProducesResponseType(typeof(IEnumerable<CountryListDto>), (int)HttpStatusCode.OK)]
        public IActionResult Search(string search, int? delegationId)
        {            
            var countries = _repository.GetAll<Country>();

            if(delegationId.HasValue){
                countries = countries.Where(c => c.DelegationId == delegationId);
            }

            if(!string.IsNullOrWhiteSpace(search)){
                countries = countries.Where(c => c.Name.Contains(search));
            }
                
            var result = Mapper.Map<IEnumerable<Country>, IEnumerable<CountryListDto>>(countries);
            return Ok(result);
        }        
    }
}