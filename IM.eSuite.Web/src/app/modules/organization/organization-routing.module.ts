import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrganizationListComponent } from './components/organization-list/organization-list.component';
import { OrganizationFormComponent } from './components/organization-form/organization-form.component';
import { PlantFormComponent } from './components/plant-form/plant-form.component';

import { PlantsResolve } from './resolvers/plants.resolve';
import { PlantUpdateResolve } from './resolvers/plant.update.resolve';
import { PlantCreateResolve } from './resolvers/plant.create.resolve';
import { OrganizationCreateResolve } from './resolvers/organization.create.resolve';
import { OrganizationUpdateResolve } from './resolvers/organization.update.resolve';
import { DelegationsResolve } from './resolvers/delegations.resolve';
import { SectorsResolve } from './resolvers/sectors.resolve';

const routes: Routes = [
  { path : '', component: OrganizationListComponent, resolve : { plants: PlantsResolve }},
  { path : 'form', component: OrganizationFormComponent, resolve: { parentOrganization: OrganizationCreateResolve, plant: PlantCreateResolve } },
  { path : 'form/:id', component: OrganizationFormComponent, resolve: { organization: OrganizationUpdateResolve }},
  { path : 'form-plant', component: PlantFormComponent, resolve:{ delegations: DelegationsResolve, sectors: SectorsResolve }},  
  { path : 'form-plant/:id', component: PlantFormComponent, resolve: { plant: PlantUpdateResolve, delegations: DelegationsResolve, sectors: SectorsResolve }} 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizationRoutingModule { }