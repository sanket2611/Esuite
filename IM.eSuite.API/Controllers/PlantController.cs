using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using IM.NETCore.Web.Filters;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using IM.eSuite.API.Dto;
using IM.eSuite.Domain;
using System.Threading.Tasks;
using IM.eSuite.Service;
using IM.DotNet.Linq;
using AutoMapper;

namespace IM.eSuite.API.Controllers
{
    [Route("api/[controller]")]
    public class PlantController : Controller
    {
        private readonly IM.NETCore.Core.Linq.IRepository<DbContext> _repository;
        private readonly IPlantService _plantService;
        private readonly IPlantPropertyMappingService _plantPropertyMappingService;
        public PlantController(IM.NETCore.Core.Linq.IRepository<DbContext> repository, IPlantService plantService,
            IPlantPropertyMappingService plantPropertyMappingService)
        {
            _repository = repository;
            _plantService = plantService;
            _plantPropertyMappingService = plantPropertyMappingService;
        }

        /// <summary>
        /// Get the list of plants
        /// </summary>
        /// <param name="request">The request with paging, sorting and filtering parameters</param>
        /// <returns>A PagedList of plants</returns>
        /// <response code="200">Returns the plant list</response>
        [HttpGet]
        [Authorize(Policy = UserRole.eSuite_MasterData_Plant_Read)]
        [ProducesResponseType(typeof(PagedList<PlantListDto>), (int)HttpStatusCode.OK)]
        public IActionResult Get(PlantListRequestDto request)
        {
            if(!_plantPropertyMappingService.ValidMappingExists(request.SortBy)){
                return BadRequest("property mapping doesn't exist");
            }

            var sgId = User.Identity.Name;
            var query = _repository.FindBy<Plant>(p => !p.IsDeleted 
                && p.Users.Any(up => up.User.UserName == sgId));

            if(!string.IsNullOrWhiteSpace(request.Search)){
                query = query.Where(p => p.Name.Contains(request.Search) 
                    || p.GaiaCode.Contains(request.Search));
            }

            var result = query.ApplySort(request.SortBy, request.IsDescending, _plantPropertyMappingService.PropertyMappings)
                .ToPagedList<Plant>(request.PageNumber, request.PageSize);
            
            var plants = Mapper.Map<PagedList<Plant>, PagedList<PlantListDto>>(result);            
            return Ok(plants);
        }

        /// <summary>
        /// Searches a plant by name or GAIA code
        /// </summary>        
        /// <param name="request">The request with search string, sector id, delegation id, country id, business unit id and soa id</param>        
        /// <returns>A list of plants</returns>
        /// <response code="200">Returns the plant list</response>        
        [HttpGet]
        [Authorize(Policy = UserRole.eSuite_MasterData_Plant_Read)]
        [Route("search")]
        [ProducesResponseType(typeof(IEnumerable<PlantListDto>), (int)HttpStatusCode.OK)]
        public IActionResult Search(PlantSearchRequest request)
        {
            var sgid = User.Identity.Name;
            var myPlantsIds = _repository.FindBy<User>(u => u.UserName == sgid).Take(1).SelectMany(u => u.Plants.Select(p => p.PlantId));

            var result = _plantService.Search(request).Where(p => myPlantsIds.Contains(p.Id));
            var plants = Mapper.Map<IEnumerable<Plant>, IEnumerable<PlantListDto>>(result);
            return Ok(plants);
        }

        /// <summary>
        /// Get a plant
        /// </summary>
        /// <param name="id">The id of the plant</param>
        /// <returns>A plant</returns>
        /// <response code="200">Returns the plant</response>
        /// <response code="404">If the plant is not found</response>
        [HttpGet]
        [Authorize(Policy = UserRole.eSuite_MasterData_Plant_Read)]
        [ProducesResponseType(typeof(PlantGetDto), (int)HttpStatusCode.OK)]
        [Route("{id}", Name = "GetPlant")]
        public IActionResult GetById(int id)
        {
            var sgId = User.Identity.Name;
            var plant = _repository.FindBy<Plant>(p => p.Id == id && p.Users.Any(up => up.User.UserName == sgId))
                .Include(p => p.Country)
                .Include(p => p.SOA)
                .ThenInclude(soa => soa.BusinessUnit)
                .FirstOrDefault();

            if(plant == null)
            {
                return NotFound();
            }

            var result = Mapper.Map<Plant, PlantGetDto>(plant);
            return Ok(result);
        }

        /// <summary>
        /// Creates a plant
        /// </summary>
        /// <param name="plant">The plant</param>
        /// <returns>Id of the plant</returns>
        /// <response code="201">Returns the plant's id</response>
        /// <response code="400">If plant is invalid</response>
        /// <response code="409">If the plant already exists</response>
        [HttpPost]
        [Authorize(Policy = UserRole.eSuite_MasterData_Plant_Write)]
        [ValidationFilter]
        [ProducesResponseType(typeof(int), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> Create([FromBody]Plant plant)
        {            
            if(_plantService.IsExisting(plant))
            {
                return StatusCode((int)HttpStatusCode.Conflict);
            }

            _repository.Add(plant);
            _repository.Save();

            await _plantService.PublishSaveEventAsync(plant);

            return CreatedAtRoute("GetPlant", new { id = plant.Id }, Mapper.Map<Plant, PlantGetDto>(plant));
        }

        /// <summary>
        /// Updates a plant
        /// </summary>
        /// <param name="plant">The plant</param>
        /// <returns></returns>
        /// <response code="204"></response>
        /// <response code="400">If plant is invalid</response>
        /// <response code="404">If the plant is not found</response>
        /// <response code="409">If the plant already exists</response>
        [HttpPut]
        [Authorize(Policy = UserRole.eSuite_MasterData_Plant_Write)]
        [ValidationFilter]
        [ProducesResponseType(typeof(void), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> Update([FromBody]Plant plant)
        {
            if(_plantService.IsExisting(plant))
            {                
                return StatusCode((int)HttpStatusCode.Conflict);
            }

            var dbPlant = _repository.GetById<Plant>(plant.Id);
            if(dbPlant == null)
            {
                return NotFound();
            }

            dbPlant.Name = plant.Name;
            dbPlant.GaiaCode = plant.GaiaCode;
            dbPlant.CountryId = plant.CountryId;
            dbPlant.SOAId = plant.SOAId;

            _repository.Update(dbPlant);
            _repository.Save();

            await _plantService.PublishSaveEventAsync(dbPlant);

            return NoContent();
        }

        /// <summary>
        /// Deletes an plant
        /// </summary>
        /// <param name="id">The id of the plant</param>
        /// <returns></returns>
        /// <response code="204"></response>
        /// <response code="404">If the plant is not found</response>
        [HttpDelete("{id}")]
        [Authorize(Policy = UserRole.eSuite_MasterData_Plant_Write)]
        [ProducesResponseType(typeof(void), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> Delete(int id)
        {            
            var dbPlant = _repository.GetById<Plant>(id);
            if(dbPlant == null)
            {
                return NotFound();
            }

            dbPlant.IsDeleted = true;
            _repository.Update(dbPlant);
            _repository.Save();
            
            await _plantService.PublishSaveEventAsync(dbPlant);

            return NoContent();
        }
    }
}