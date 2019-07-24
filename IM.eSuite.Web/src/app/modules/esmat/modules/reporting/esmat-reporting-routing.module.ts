import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlantsResolve } from '../../../organization/resolvers/plants.resolve';
import { ReportingComponent } from './components/reporting/reporting.component';

const routes: Routes = [
  { path : '', component: ReportingComponent, resolve:{ plants: PlantsResolve } }  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EsmatReportingRoutingModule { }