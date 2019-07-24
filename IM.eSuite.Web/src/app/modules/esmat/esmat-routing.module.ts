import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from '@im-angular/authentication';
import { PlantsResolve } from '../organization/resolvers/plants.resolve';
import { EmployeeTypesResolve } from './resolvers/employee-types.resolve';
import { SchedulesResolve } from './resolvers/schedules.resolve';
import { ScheduleUpdateResolve } from './resolvers/schedule.update.resolve';
import { ScheduleGetResolve } from './resolvers/schedule.get.resolve';
import { ActionUpdateResolve } from './resolvers/action.update.resolve';
import { ShiftsResolve } from './resolvers/shifts.resolve';
import { SmatsResolve } from './resolvers/smats.resolve';
import { SmatUpdateResolve } from './resolvers/smat.update.resolve';
import { ObservationGetResolve } from './resolvers/observation.get.resolve';
import { SmatRootComponent } from './components/smat-root/smat-root.component';
import { HomeComponent } from './components/home/home.component';
import { ScheduleFormComponent } from './components/schedule-form/schedule-form.component';
import { SmatFormComponent } from './components/smat-form/smat-form.component';
import { HistoryComponent } from './components/history/history.component';
import { ActionFormComponent } from './components/action-form/action-form.component';

const routes: Routes = [
  { path : '', component: SmatRootComponent, canActivate: [AuthenticationGuard], children: [
    { path : '', component: HomeComponent, resolve: { plants: PlantsResolve, schedules: SchedulesResolve } },    
    { path : 'schedule', component: ScheduleFormComponent, resolve: { plants: PlantsResolve, employeeTypes: EmployeeTypesResolve } },
    { path : 'schedule/:id', component: ScheduleFormComponent, resolve: { schedule: ScheduleUpdateResolve, employeeTypes: EmployeeTypesResolve } },
    { path : 'form', component: SmatFormComponent, resolve: { plants: PlantsResolve, shifts: ShiftsResolve, employeeTypes: EmployeeTypesResolve  } },
    { path : ':scheduleId/form', component: SmatFormComponent, resolve: { schedule: ScheduleGetResolve, shifts: ShiftsResolve, employeeTypes: EmployeeTypesResolve } },
    { path : 'form/:id', component: SmatFormComponent, resolve: { shifts: ShiftsResolve, smat: SmatUpdateResolve, employeeTypes: EmployeeTypesResolve } },
    { path : 'history', component: HistoryComponent, resolve: { plants: PlantsResolve, smats: SmatsResolve} },    
    { path : ':observationId/action/:id', component: ActionFormComponent, resolve: { observation: ObservationGetResolve, action: ActionUpdateResolve } },
    { path : 'master-data', loadChildren: 'app/modules/esmat/modules/master-data/esmat-master-data.module#EsmatMasterDataModule'},
    { path : 'reporting', loadChildren: 'app/modules/esmat/modules/reporting/esmat-reporting.module#EsmatReportingModule'},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EsmatRoutingModule { }