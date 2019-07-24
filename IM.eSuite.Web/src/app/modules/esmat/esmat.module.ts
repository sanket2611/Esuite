import { NgModule } from '@angular/core';
import { EsmatRoutingModule } from './esmat-routing.module';
import { SharedModule } from '../shared/shared.module';
import { TooltipModule } from 'ngx-bootstrap';

import { eSmatApiStaticFileService } from './services/esmat-api-static-file.service';
import { SmatReceiverService } from './services/smat-receiver.service';
import { ScheduleService } from './services/schedule.service';
import { ObservationTypeService } from './services/observation-type.service';
import { LanguageService } from './services/language.service';
import { ObservationCategoryService } from './services/observation-category.service';
import { ObservationSubCategoryService } from './services/observation-sub-category.service';
import { ShiftService } from './services/shift.service';
import { SchedulesResolve } from './resolvers/schedules.resolve';
import { ScheduleUpdateResolve } from './resolvers/schedule.update.resolve';
import { ScheduleGetResolve } from './resolvers/schedule.get.resolve';
import { PlantGetResolve } from './resolvers/plant.get.resolve';
import { ShiftsResolve } from './resolvers/shifts.resolve';
import { SmatService } from './services/smat.service';
import { SmatsResolve } from './resolvers/smats.resolve';
import { SmatUpdateResolve } from './resolvers/smat.update.resolve';
import { ObservationService } from './services/observation.service';
import { ObservationGetResolve } from './resolvers/observation.get.resolve';
import { EsmatActionPlanService } from './services/esmat-action-plan.service';
import { ActionUpdateResolve } from './resolvers/action.update.resolve';
import { EmployeeTypesResolve } from './resolvers/employee-types.resolve';
import { EmployeeTypeService } from './services/employee-type.service';

import { SmatRootComponent } from './components/smat-root/smat-root.component';
import { HomeComponent } from './components/home/home.component';
import { ScheduleFormComponent } from './components/schedule-form/schedule-form.component';
import { ScheduleImportComponent } from './components/schedule-import/schedule-import.component';
import { ScheduledSmatDeleteComponent } from './components/scheduled-smat-delete/scheduled-smat-delete.component';
import { SmatFormComponent } from './components/smat-form/smat-form.component';
import { ScheduleFieldsComponent } from './components/schedule-fields/schedule-fields.component';
import { ObservationFormComponent } from './components/observation-form/observation-form.component';
import { HistoryComponent } from './components/history/history.component';
import { SmatDeleteComponent } from './components/smat-delete/smat-delete.component';
import { ActionFormComponent } from './components/action-form/action-form.component';
import { ActionModalComponent } from './components/action-modal/action-modal.component';
import { SmatReceiverAddComponent } from './components/smat-receiver-add/smat-receiver-add.component';
import { SmatReceiverFieldsComponent } from './components/smat-receiver-fields/smat-receiver-fields.component';
import { ObservationTypesResolve } from './modules/master-data/resolvers/observation-type.resolve';

@NgModule({
  imports: [
    SharedModule,    
    TooltipModule.forRoot(),
    EsmatRoutingModule
  ],
  declarations: [
    SmatRootComponent,
    HomeComponent,
    ScheduleFormComponent,
    ScheduledSmatDeleteComponent, 
    ScheduleImportComponent,
    ScheduledSmatDeleteComponent,
    ScheduleFieldsComponent,
    SmatFormComponent,
    ObservationFormComponent,
    HistoryComponent,
    SmatDeleteComponent,    
    ObservationFormComponent,
    ActionFormComponent,
    ActionModalComponent,
    SmatReceiverAddComponent,
    SmatReceiverFieldsComponent
  ],
  providers: [
    eSmatApiStaticFileService,
    SmatReceiverService,
    ScheduleService,
    SchedulesResolve,
    ScheduleUpdateResolve,
    ScheduleGetResolve,
    ObservationTypeService,
    ObservationService,
    ObservationGetResolve,
    LanguageService,
    ObservationCategoryService,
    ObservationSubCategoryService,
    ObservationTypesResolve,
    PlantGetResolve,
    ShiftService,
    ShiftsResolve,
    SmatService,
    SmatsResolve,
    SmatUpdateResolve,
    EsmatActionPlanService,
    EmployeeTypeService,
    EmployeeTypesResolve,
    ActionUpdateResolve
  ],
  exports: [
    SmatReceiverFieldsComponent
  ]
})
export class EsmatModule { }
