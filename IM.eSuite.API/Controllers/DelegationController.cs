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
    public class DelegationController : Controller
    {
        private readonly IRepository<DbContext> _repository;
        public DelegationController(IRepository<DbContext> repository)
        {
            _repository = repository;
        }

        /// <summary>
        /// Searches a delegation by name
        /// </summary>        
        /// <param name="search">The search string</param>        
        /// <returns>A list of delegations</returns>
        /// <response code="200">Returns the delegations list</response>        
        [HttpGet]
        [Authorize(Policy = UserRole.eSuite_MasterData_Delegation_Read)]
        [Route("search")]
        [ProducesResponseType(typeof(IEnumerable<DelegationListDto>), (int)HttpStatusCode.OK)]
        public IActionResult Search(string search)
        {            
            var delegations = _repository.GetAll<Delegation>();            

            if(!string.IsNullOrWhiteSpace(search)){
                delegations = delegations.Where(d => d.Name.Contains(search));
            }
                
            var result = Mapper.Map<IEnumerable<Delegation>, IEnumerable<DelegationListDto>>(delegations);
            return Ok(result);
        }        
    }
}