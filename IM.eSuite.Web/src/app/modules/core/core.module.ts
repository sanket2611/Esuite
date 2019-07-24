import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

import { AuthorizationService, AuthenticationGuard, AuthenticationService, OAuthConfiguration } from '@im-angular/authentication';
import { DirectoryService } from '../administration/services/directory.service';
import { DelegationService } from '../organization/services/delegation.service';
import { SectorService } from '../organization/services/sector.service';
import { SOAService } from '../organization/services/soa.service';
import { PlantService } from '../organization/services/plant.service';
import { CountryService } from '../organization/services/country.service';
import { BusinessUnitService } from '../organization/services/business-unit.service';
import { PlantSearchService } from '../organization/services/plant-search.service';
import { OrganizationService } from '../organization/services/organization.service';
import { UserService } from '../administration/services/user.service';
import { ActionPlanService } from '../eaction/services/action-plan.service';
import { StatusService } from '../eaction/services/status.service';
import { ReportingService } from '../eaction/services/reporting.service';
import { AdminLteService } from '../../services/admin-lte.service';
import { TranslationService } from '../../services/translation.service';

import { DelegationsResolve } from '../organization/resolvers/delegations.resolve';
import { SectorsResolve } from '../organization/resolvers/sectors.resolve';
import { PlantsResolve } from '../organization/resolvers/plants.resolve';

export function AuthenticationServiceFactory(http: HttpClient, authorizationService: AuthorizationService){
  return new AuthenticationService(http, authorizationService, environment.oAuth, environment.eSuiteApi); 
}

@NgModule({
  imports: [],
  declarations: [],
  providers: [
    AuthorizationService, 
    AuthenticationGuard,  
    {
      provide: AuthenticationService,
      useFactory: AuthenticationServiceFactory,
      deps: [HttpClient, AuthorizationService]
    },
    {
      provide: OAuthConfiguration,
      useValue: environment.oAuth
    },
    DirectoryService,
    DelegationService,
    DelegationsResolve,
    SectorService,
    SectorsResolve,
    CountryService,
    BusinessUnitService,
    SOAService,
    PlantService,
    PlantSearchService,
    PlantsResolve,
    OrganizationService,
    UserService,
    ActionPlanService,
    StatusService,
    ReportingService,
    AdminLteService,
    TranslationService
  ]
})
export class CoreModule { }