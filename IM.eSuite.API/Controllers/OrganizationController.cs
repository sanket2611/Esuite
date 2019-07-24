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
using Microsoft.AspNetCore.Http;
using IM.eSuite.Common;
using AutoMapper;
using IM.DotNet.Linq;

namespace IM.eSuite.API.Controllers
{
    [Route("api/[controller]")]
    public class OrganizationController : Controller
    {
        private readonly NETCore.Core.Linq.IRepository<DbContext> _repository;
        private readonly IOrganizationService _organizationService;
        private readonly IOrganizationsImportService _organizationsImportService;
        private readonly IOrganizationPropertyMappingService _organizationPropertyMappingService;
        public OrganizationController(NETCore.Core.Linq.IRepository<DbContext> repository, IOrganizationService organizationService,
            IOrganizationsImportService organizationsImportService, IOrganizationPropertyMappingService organizationPropertyMappingService)
        {
            _repository = repository;
            _organizationService = organizationService;
            _organizationsImportService = organizationsImportService;
            _organizationPropertyMappingService = organizationPropertyMappingService;
        }

        /// <summary>
        /// Get the list of organizations
        /// </summary>
        /// <param name="request">The request with paging, sorting and filtering parameters</param>
        /// <returns>A PagedList of organizations</returns>
        /// <response code="200">Returns the organization list</response>
        [HttpGet]
        [Authorize(Policy = UserRole.eSuite_MasterData_Organization_Read)]
        [Route("get")]
        [ProducesResponseType(typeof(PagedList<OrganizationListDto>), (int)HttpStatusCode.OK)]
        public IActionResult Get(OrganizationListRequestDto request)
        {
            if (!_organizationPropertyMappingService.ValidMappingExists(request.SortBy))
            {
                return BadRequest("property mapping doesn't exist");
            }

            var query = _repository.FindBy<Organization>(o => o.ParentId == request.ParentId
                && o.PlantId == request.PlantId && !o.IsDeleted)
                .ApplySort(request.SortBy, request.IsDescending, _organizationPropertyMappingService.PropertyMappings)
                .ToPagedList(request.PageNumber, request.PageSize);

            var organizations = Mapper.Map<PagedList<Organization>, PagedList<OrganizationListDto>>(query);
            return Ok(organizations);
        }

        /// <summary>
        /// Searches an organization by name, cif and parent organization id
        /// </summary>        
        /// <param name="search">The search string</param>
        /// <param name="parentId">Parent organization id</param>
        /// <param name="plantId">Plant id</param>
        /// <returns>A list of organizations</returns>
        /// <response code="200">Returns the organization list</response>        
        [HttpGet]
        [Authorize(Policy = UserRole.eSuite_MasterData_Organization_Read)]
        [Route("search")]
        [ProducesResponseType(typeof(IEnumerable<OrganizationListDto>), (int)HttpStatusCode.OK)]
        public IActionResult Search(string search, int? parentId, int? plantId)
        {
            var organizations = _repository.FindBy<Organization>(o => o.ParentId == parentId
                && o.PlantId == plantId && !o.IsDeleted);

            if (!string.IsNullOrWhiteSpace(search))
            {
                organizations = organizations.Where(o => o.Name.Contains(search));
            }

            var result = Mapper.Map<IEnumerable<Organization>, IEnumerable<OrganizationListDto>>(organizations);
            return Ok(result);
        }

        /// <summary>
        /// Get an organization
        /// </summary>
        /// <param name="id">The id of the organization</param>
        /// <returns>An organization</returns>
        /// <response code="200">Returns the organization</response>
        /// <response code="404">If the organization is not found</response>
        [HttpGet]
        [Authorize(Policy = UserRole.eSuite_MasterData_Organization_Read)]
        [ProducesResponseType(typeof(OrganizationGetDto), (int)HttpStatusCode.OK)]
        [Route("{id}", Name = "GetOrganization")]
        public IActionResult GetById(int id)
        {
            var organization = _repository.FindBy<Organization>(o => o.Id == id)
                .Include(o => o.Parent)
                .FirstOrDefault();
            if (organization == null)
            {
                return NotFound();
            }

            var result = Mapper.Map<Organization, OrganizationGetDto>(organization);
            return Ok(result);
        }

        /// <summary>
        /// Creates an organization
        /// </summary>
        /// <param name="organization">The organization</param>
        /// <returns>Id of the organization</returns>
        /// <response code="201">Returns the organization's id</response>
        /// <response code="400">If organization is invalid</response>
        [HttpPost]
        [Authorize(Policy = UserRole.eSuite_MasterData_Organization_Write)]
        [ValidationFilter]
        [ProducesResponseType(typeof(int), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> Create([FromBody]Organization organization)
        {
            organization.Type = OrganizationLevelType.Department;
            if (organization.ParentId.HasValue)
            {
                var parentOrganization = _repository.GetById<Organization>(organization.ParentId.Value);
                if (parentOrganization == null)
                {
                    return BadRequest();
                }
                organization.Type = (OrganizationLevelType)((int)parentOrganization.Type + 1);
                organization.PlantId = null;
            }
            else if (organization.PlantId.HasValue)
            {
                if (!_repository.FindBy<Plant>(p => p.Id == organization.PlantId).Any())
                {
                    return BadRequest();
                }
            }
            else if (!organization.PlantId.HasValue)
            {
                return BadRequest();
            }

            var query = _repository.FindBy<Organization>(o => o.Name == organization.Name);
            if (organization.PlantId.HasValue)
            {
                query = query.Where(o => o.PlantId == organization.PlantId);
            }
            else if (organization.ParentId.HasValue)
            {
                query = query.Where(o => o.ParentId == organization.ParentId);
            }
            var existingOrganization = query.FirstOrDefault();

            if (existingOrganization == null)
            {
                _repository.Add(organization);
            }
            else
            {
                if (existingOrganization.IsDeleted)
                {
                    existingOrganization.IsDeleted = false;
                    _repository.Update(existingOrganization);
                    organization = existingOrganization;
                }
                else
                {
                    return StatusCode((int)HttpStatusCode.Conflict);
                }
            }

            _repository.Save();

            await _organizationService.PublishSaveEventAsync(organization);
            return CreatedAtRoute("GetOrganization", new { id = organization.Id }, Mapper.Map<Organization, OrganizationGetDto>(organization));
        }

        /// <summary>
        /// Updates an organization
        /// </summary>
        /// <param name="organization">The organization</param>
        /// <returns></returns>
        /// <response code="204"></response>
        /// <response code="400">If organization is invalid</response>
        /// <response code="404">If the organization is not found</response>
        [HttpPut]
        [Authorize(Policy = UserRole.eSuite_MasterData_Organization_Write)]
        [ValidationFilter]
        [ProducesResponseType(typeof(void), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> Update([FromBody]Organization organization)
        {
            var dbOrganization = _repository.GetById<Organization>(organization.Id);
            if (dbOrganization == null)
            {
                return NotFound();
            }

            dbOrganization.Name = organization.Name;

            _repository.Update(dbOrganization);
            _repository.Save();

            await _organizationService.PublishSaveEventAsync(dbOrganization);

            return NoContent();
        }

        /// <summary>
        /// Imports organizations
        /// </summary>
        /// <param name="file">The organizations in xlsx file</param>
        /// <response code="200"></response>
        /// <response code="400">If file is invalid</response>        
        [HttpPost("import")]
        [Authorize(Policy = UserRole.eSuite_MasterData_Organization_Write)]
        [ProducesResponseType(typeof(ImportResult), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> Import(IFormFile file)
        {
            var invalidFile = _organizationsImportService.ValidateFile(file);
            if (!string.IsNullOrWhiteSpace(invalidFile))
            {
                return BadRequest(invalidFile);
            }

            var result = await _organizationsImportService.Import(file);
            return Ok(result);
        }

        /// <summary>
        /// Deletes an organization
        /// </summary>
        /// <param name="id">The id of the organization</param>
        /// <returns></returns>
        /// <response code="204"></response>
        /// <response code="404">If the organization is not found</response>
        [HttpDelete("{id}")]
        [Authorize(Policy = UserRole.eSuite_MasterData_Organization_Write)]
        [ProducesResponseType(typeof(void), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> Delete(int id)
        {
            var dbOrganization = _repository.GetById<Organization>(id);
            if (dbOrganization == null)
            {
                return NotFound();
            }

            dbOrganization.IsDeleted = true;
            _repository.Update(dbOrganization);
            _repository.Save();

            await _organizationService.PublishSaveEventAsync(dbOrganization);

            return NoContent();
        }
    }
}