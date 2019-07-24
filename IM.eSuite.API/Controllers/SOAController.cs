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
    public class SOAController : Controller
    {
        private readonly IRepository<DbContext> _repository;
        public SOAController(IRepository<DbContext> repository)
        {
            _repository = repository;
        }

        /// <summary>
        /// Searches a soa by name
        /// </summary>        
        /// <param name="search">The search string</param>
        /// <param name="businessUnitId">The business unit id</param>
        /// <returns>A list of soas</returns>
        /// <response code="200">Returns the soas list</response>        
        [HttpGet]
        [Authorize(Policy = UserRole.eSuite_MasterData_SOA_Read)]
        [Route("search")]
        [ProducesResponseType(typeof(IEnumerable<SOAListDto>), (int)HttpStatusCode.OK)]
        public IActionResult Search(string search, int? businessUnitId)
        {            
            var soas = _repository.GetAll<SOA>();

            if(businessUnitId.HasValue){
                soas = soas.Where(bu => bu.BusinessUnitId == businessUnitId);
            }

            if(!string.IsNullOrWhiteSpace(search)){
                soas = soas.Where(bu => bu.Name.Contains(search));
            }
                
            var result = Mapper.Map<IEnumerable<SOA>, IEnumerable<SOAListDto>>(soas);
            return Ok(result);
        }        
    }
}