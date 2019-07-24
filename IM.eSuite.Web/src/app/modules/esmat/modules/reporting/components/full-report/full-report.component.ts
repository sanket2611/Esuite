import { Component, OnInit, Input } from '@angular/core';
import { ReportingFilterViewModel } from '../../viewModels/reporting-filter.viewModel';
import { ReportingService } from '../../services/reporting.service';
import { FileSaverService } from '../../../../../../services/file-saver.service';

@Component({
  selector: 'app-full-report',
  templateUrl: './full-report.component.html',
  styleUrls: ['./full-report.component.less']
})
export class FullReportComponent implements OnInit {
  private _model: ReportingFilterViewModel;
  
  @Input() get model(): ReportingFilterViewModel {
    return this._model;
  }  
  set model(value: ReportingFilterViewModel) {    
    this._model = value;
    if(value && value.plantId){
      this.onModelChanged();
    }    
  }

  constructor(private reportingService: ReportingService, private fileSaverService: FileSaverService) { }

  ngOnInit(){    
  }

  onModelChanged(){
    let request = this.model.toReportingRequest();
    this.reportingService.getFullReport(request)
      .subscribe(result => this.fileSaverService.saveToFileSystem(result));
  }
}