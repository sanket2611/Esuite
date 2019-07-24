import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HazardListComponent } from './components/hazard-list/hazard-list.component';
import { HazardFormComponent } from './components/hazard-form/hazard-form.component';
import { EpiCategoriesResolve } from './resolvers/epi-categories.resolve';
import { EpiListComponent } from './components/epi-list/epi-list.component';
import { EpiFormComponent } from './components/epi-form/epi-form.component';
import { EpiResolve } from './resolvers/epi.resolve';
import { LanguagesResolve } from './resolvers/languages.resolve';
import { HazardGetResolve } from './resolvers/hazard-get.resolve';
import { EpiGetResolve } from './resolvers/epi-get.resolve';
import { PlantsResolve } from '../../../organization/resolvers/plants.resolve';
import { PlantGetResolve } from './resolvers/plant.get.resolve';


const routes: Routes = [
  { path : 'hazard', component: HazardListComponent, resolve : { plants : PlantsResolve }  },
  { path : 'hazard/:plantId', component: HazardListComponent, resolve : { plants : PlantsResolve ,  plant : PlantGetResolve  }  },
  { path : 'hazard/:plantId/form', component: HazardFormComponent, resolve: { languages: LanguagesResolve , plant : PlantGetResolve } },
  { path : 'hazard/:plantId/form/:id', component: HazardFormComponent, resolve: { hazard: HazardGetResolve, languages: LanguagesResolve , plant : PlantGetResolve } },
  { path : 'epi', component: EpiListComponent, resolve : { epiCategories: EpiCategoriesResolve,  plants : PlantsResolve} },
  { path : 'epi/:plantId/form', component: EpiFormComponent, resolve: { plant : PlantGetResolve, categories: EpiCategoriesResolve, languages: LanguagesResolve } },
  { path : 'epi/:plantId/form/:id', component: EpiFormComponent, resolve: { plant : PlantGetResolve, epi: EpiGetResolve, categories: EpiCategoriesResolve, languages: LanguagesResolve } }  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EriskMasterDataRoutingModule { }