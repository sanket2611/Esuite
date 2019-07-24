using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using IM.NETCore.Core.Linq;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using IM.eSuite.Domain;
using IM.eSuite.API.Dto;
using AutoMapper;

namespace IM.eSuite.API.Controllers
{
    [Route("api/[controller]")]
    public class SectorController : Controller
    {
        private readonly IRepository<DbContext> _repository;
        public SectorController(IRepository<DbContext> repository)
        {
            _repository = repository;
        }

        /// <summary>
        /// Searches a sector by name
        /// </summary>        
        /// <param name="search">The search string</param>        
        /// <returns>A list of sector</returns>
        /// <response code="200">Returns the sector list</response>        
        [HttpGet]
        [Authorize(Policy = UserRole.eSuite_MasterData_Sector_Read)]
        [Route("search")]
        [ProducesResponseType(typeof(IEnumerable<SectorListDto>), (int)HttpStatusCode.OK)]
        public IActionResult Search(string search)
        {            
            var sectors = _repository.GetAll<Sector>();            

            if(!string.IsNullOrWhiteSpace(search)){
                sectors = sectors.Where(d => d.Name.Contains(search));
            }
                
            var result = Mapper.Map<IEnumerable<Sector>, IEnumerable<SectorListDto>>(sectors);
            return Ok(result);
        }        
    }
}