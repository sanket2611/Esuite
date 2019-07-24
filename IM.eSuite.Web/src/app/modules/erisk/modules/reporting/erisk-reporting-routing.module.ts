import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportingComponent } from './components/reporting/reporting.component';
import { PlantsResolve } from '../../../organization/resolvers/plants.resolve';

const routes: Routes = [
  { path : '', component: ReportingComponent, resolve:{ plants: PlantsResolve } }  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EriskReportingRoutingModule { }
