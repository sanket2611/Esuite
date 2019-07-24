import { Component, OnInit } from '@angular/core';
import { ReportingFilterViewModel } from '../../viewModels/reporting-filter.viewModel';
import { ReportTypeEnum } from '../../enums/report-type-enum';

@Component({
  selector: 'app-reporting',
  templateUrl: './reporting.component.html',
  styleUrls: ['./reporting.component.less']
})
export class ReportingComponent implements OnInit {
  reportingFilter: ReportingFilterViewModel;
  ReportTypeEnum = ReportTypeEnum;

  constructor() { }

  ngOnInit(){   
    this.reportingFilter = new ReportingFilterViewModel();    
  }
  
  onReportingFiltered(filter: ReportingFilterViewModel){
    this.reportingFilter = Object.assign(new ReportingFilterViewModel(), filter);    
  }

  onFilterRemoved(){
    this.reportingFilter = new ReportingFilterViewModel(); 
  }

  isReport(type: ReportTypeEnum){
    return this.reportingFilter.report == type;
  }
}