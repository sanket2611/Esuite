import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EriskReportingRoutingModule } from './erisk-reporting-routing.module';
import { ReportingService } from './services/reporting.service';
import { ChartService } from './services/chart.service';
import { RiskByOrganizationComponent } from './components/risk-by-organization/risk-by-organization.component';
import { RiskByHazardComponent } from './components/risk-by-hazard/risk-by-hazard.component';
import { ReportingFilterComponent } from './components/reporting-filter/reporting-filter.component';
import { ReportingComponent } from './components/reporting/reporting.component';
import { SharedModule } from '../../../shared/shared.module';
import { ScoringByOrganizationComponent } from './components/scoring-by-organization/scoring-by-organization.component';
import { OverviewComponent } from './components/overview/overview.component';
import { BsDatepickerModule } from 'ngx-bootstrap';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    BsDatepickerModule,
    EriskReportingRoutingModule
  ],
  providers: [
    ReportingService,
    ChartService
  ],
  declarations: [
    ReportingComponent,
    ReportingFilterComponent,
    RiskByOrganizationComponent,
    ScoringByOrganizationComponent,
    RiskByHazardComponent,
    OverviewComponent
  ]
})
export class EriskReportingModule { }
