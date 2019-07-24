using System;
using AutoMapper;
using IM.eSuite.API.Dto;
using IM.eSuite.Domain;

namespace IM.eSuite.API.ServicesConfiguration
{
    public static class AutoMapperConfiguration
    {        
        public static void ConfigureAutoMapper()
        {
            Mapper.Initialize(cfg => {
                cfg.CreateMap<Sector, SectorListDto>();
                cfg.CreateMap<BusinessUnit, BusinessUnitListDto>();
                cfg.CreateMap<BusinessUnit, BusinessUnitGetDto>();
                cfg.CreateMap<Delegation, DelegationListDto>();
                cfg.CreateMap<Country, CountryListDto>();
                cfg.CreateMap<Country, CountryGetDto>();
                cfg.CreateMap<SOA, SOAListDto>();
                cfg.CreateMap<SOA, SOAGetDto>();
                cfg.CreateMap<Plant, PlantListDto>();
                cfg.CreateMap<Plant, PlantGetDto>();
                cfg.CreateMap<Organization, OrganizationListDto>();
                cfg.CreateMap<Organization, OrganizationGetDto>();
                cfg.CreateMap<ApplicationUserGroup, ApplicationUserGroupListDto>();
                cfg.CreateMap<ApplicationUserGroup, ApplicationUserGroupDto>();
                cfg.CreateMap<UserGroupUser, UserGroupDto>();
                cfg.CreateMap<UserPlant, UserPlantDto>();
                cfg.CreateMap<User, UserListDto>();
                cfg.CreateMap<User, UserGetDto>();
                cfg.CreateMap<Application, ApplicationListDto>();
                cfg.CreateMap<Application, ApplicationGetDto>();
            });
        }
    }
}