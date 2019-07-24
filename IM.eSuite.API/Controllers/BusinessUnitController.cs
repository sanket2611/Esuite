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
    public class BusinessUnitController : Controller
    {
        private readonly IRepository<DbContext> _repository;
        public BusinessUnitController(IRepository<DbContext> repository)
        {
            _repository = repository;
        }

        /// <summary>
        /// Searches a business unit by name
        /// </summary>        
        /// <param name="search">The search string</param>
        /// <param name="sectorId">The sector id</param>
        /// <returns>A list of busines units</returns>
        /// <response code="200">Returns the business units list</response>        
        [HttpGet]
        [Authorize(Policy = UserRole.eSuite_MasterData_BusinessUnit_Read)]
        [Route("search")]
        [ProducesResponseType(typeof(IEnumerable<BusinessUnitListDto>), (int)HttpStatusCode.OK)]
        public IActionResult Search(string search, int? sectorId)
        {            
            var businessUnits = _repository.GetAll<BusinessUnit>();

            if(sectorId.HasValue){
                businessUnits = businessUnits.Where(bu => bu.SectorId == sectorId);
            }

            if(!string.IsNullOrWhiteSpace(search)){
                businessUnits = businessUnits.Where(bu => bu.Name.Contains(search));
            }
                
            var result = Mapper.Map<IEnumerable<BusinessUnit>, IEnumerable<BusinessUnitListDto>>(businessUnits);
            return Ok(result);
        }        
    }
}