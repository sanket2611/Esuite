import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SmatReceiverListComponent } from './components/smat-receiver-list/smat-receiver-list.component';
import { SmatReceiverFormComponent } from './components/smat-receiver-form/smat-receiver-form.component';
import { ObservationListComponent } from './components/observation-list/observation-list.component';
import { ObservationCategoryFormComponent } from './components/observation-category-form/observation-category-form.component';
import { ObservationSubCategoryFormComponent } from './components/observation-sub-category-form/observation-sub-category-form.component';
import { PlantsResolve } from '../../../organization/resolvers/plants.resolve';
import { EmployeeTypesResolve } from '../../resolvers/employee-types.resolve';
import { SmatReceiversResolve } from './resolvers/smat-receivers.resolve';
import { SmatReceiverUpdateResolve } from './resolvers/smat-receiver.update.resolve';
import { PlantGetResolve } from '../../resolvers/plant.get.resolve';
import { ObservationTypesResolve } from './resolvers/observation-type.resolve';
import { LanguagesResolve } from './resolvers/languages.resolve';
import { ObservationCategoryUpdateResolve } from './resolvers/observation-category.update.resolve';
import { ObservationCategoryGetResolve } from './resolvers/observation-category-get.resolve';
import { ObservationSubCategoryGetResolve } from './resolvers/observation-sub-category-get.resolve';

const routes: Routes = [
  { path : 'smat-receiver', component: SmatReceiverListComponent, resolve: { receivers: SmatReceiversResolve, plants: PlantsResolve, employeeTypes: EmployeeTypesResolve } },
  { path : 'smat-receiver/form', component: SmatReceiverFormComponent , resolve: { plants: PlantsResolve, employeeTypes: EmployeeTypesResolve } },
  { path : 'smat-receiver/form/:id', component: SmatReceiverFormComponent , resolve: { employeeTypes: EmployeeTypesResolve, smatReceiver: SmatReceiverUpdateResolve } },
  { path : 'observation', component: ObservationListComponent, resolve: { plants: PlantsResolve} },
  { path : 'observation/:plantId/category-form', component: ObservationCategoryFormComponent , resolve: { plant: PlantGetResolve, observationTypes: ObservationTypesResolve, languages: LanguagesResolve} },
  { path : 'observation/:plantId/category-form/:id', component: ObservationCategoryFormComponent , resolve: { observationCategory: ObservationCategoryUpdateResolve, plant: PlantGetResolve, observationTypes: ObservationTypesResolve, languages: LanguagesResolve} },
  { path : 'observation/:categoryId/sub-category-form', component: ObservationSubCategoryFormComponent , resolve: { observationCategory: ObservationCategoryGetResolve, languages: LanguagesResolve } },
  { path : 'observation/sub-category-form/:id/:plantId', component: ObservationSubCategoryFormComponent , resolve: { languages: LanguagesResolve, observationSubCategory: ObservationSubCategoryGetResolve } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EsmatMasterDataRoutingModule { }