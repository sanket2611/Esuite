import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { EsmatReportingRoutingModule } from './esmat-reporting-routing.module';
import { ReportingService } from './services/reporting.service';
import { ChartService } from './services/chart.service';
import { ReportingComponent } from './components/reporting/reporting.component';
import { ReportingFilterComponent } from './components/reporting-filter/reporting-filter.component';
import { ObservationByTypeAndMonthComponent } from './components/observation-by-type-and-month/observation-by-type-and-month.component';
import { SmatByMonthComponent } from './components/smat-by-month/smat-by-month.component';
import { SmatByOrganizationComponent } from './components/smat-by-organization/smat-by-organization.component';
import { ObservationByCategoryComponent } from './components/observation-by-category/observation-by-category.component';
import { ObservationByOrganizationComponent } from './components/observation-by-organization/observation-by-organization.component';
import { SmatByEmployeeComponent } from './components/smat-by-employee/smat-by-employee.component';
import { ObservationByTypeComponent } from './components/observation-by-type/observation-by-type.component';
import { SmatBySmatorComponent } from './components/smat-by-smator/smat-by-smator.component';
import { ActionByStatusComponent } from './components/action-by-status/action-by-status.component';
import { GaiaExportComponent } from './components/gaia-export/gaia-export.component';
import { FullReportComponent } from './components/full-report/full-report.component';
import { SmatByEmployeeExcelComponent } from './components/smat-by-employee-excel/smat-by-employee-excel.component';
import { SmatBySmatorExcelComponent } from './components/smat-by-smator-excel/smat-by-smator-excel.component';

@NgModule({
  imports: [
    SharedModule,
    BsDatepickerModule,
    EsmatReportingRoutingModule
  ],
  providers: [
    ReportingService,
    ChartService
  ],
  declarations: [
    ReportingComponent,
    ReportingFilterComponent,
    ObservationByTypeAndMonthComponent,
    SmatByMonthComponent,
    SmatByOrganizationComponent,
    ObservationByCategoryComponent,
    ObservationByOrganizationComponent,
    SmatByEmployeeComponent,
    ObservationByTypeComponent,
    SmatBySmatorComponent,
    ActionByStatusComponent,
    GaiaExportComponent,
    FullReportComponent,
    SmatByEmployeeExcelComponent,
    SmatBySmatorExcelComponent
  ]
})
export class EsmatReportingModule { }
