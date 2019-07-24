import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { OrganizationRoutingModule } from './organization-routing.module';

import { OrganizationListComponent } from './components/organization-list/organization-list.component';
import { OrganizationListFilterComponent } from './components/organization-list-filter/organization-list-filter.component';
import { PlantFormComponent } from './components/plant-form/plant-form.component';
import { OrganizationFormComponent } from './components/organization-form/organization-form.component';
import { OrganizationDeleteComponent } from './components/organization-delete/organization-delete.component';
import { OrganizationImportComponent } from './components/organization-import/organization-import.component';

import { PlantFormService } from './components/plant-form/plant-form.service';
import { PlantCreateResolve } from './resolvers/plant.create.resolve';
import { PlantUpdateResolve } from './resolvers/plant.update.resolve';
import { OrganizationFormService } from './components/organization-form/organization-form.service';
import { OrganizationCreateResolve } from './resolvers/organization.create.resolve';
import { OrganizationUpdateResolve } from './resolvers/organization.update.resolve';

@NgModule({
  imports: [
    SharedModule,
    OrganizationRoutingModule
  ],
  declarations: [
    OrganizationListComponent,
    OrganizationListFilterComponent, 
    PlantFormComponent,
    OrganizationFormComponent, 
    OrganizationDeleteComponent,     
    OrganizationImportComponent   
  ],
  providers: [
    PlantFormService,
    PlantCreateResolve,
    PlantUpdateResolve,
    OrganizationFormService,    
    OrganizationCreateResolve,
    OrganizationUpdateResolve
  ]
})
export class OrganizationModule { }