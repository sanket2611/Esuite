import { Component, OnInit, Input } from '@angular/core';
import { ReportingService } from '../../services/reporting.service';
import { FileSaverService } from '../../../../../../services/file-saver.service';
import { ReportingFilterViewModel } from '../../viewModels/reporting-filter.viewModel';

@Component({
  selector: 'app-gaia-export',
  templateUrl: './gaia-export.component.html',
  styleUrls: ['./gaia-export.component.less']
})
export class GaiaExportComponent implements OnInit {
  private _model: ReportingFilterViewModel;
  
  @Input() get model(): ReportingFilterViewModel {
    return this._model;
  }  
  set model(value: ReportingFilterViewModel) {    
    this._model = value;
    if(value && value.month){
      this.onModelChanged();
    }    
  }

  constructor(private reportingService: ReportingService, private fileSaverService: FileSaverService) { }

  ngOnInit(){    
  }

  onModelChanged(){
    let currentDate = new Date();
    let year = (this.model.month -1 > currentDate.getMonth()) ? currentDate.getFullYear() - 1 : currentDate.getFullYear();
    this.reportingService.getGaiaExport(year, this.model.month)
      .subscribe(result => this.fileSaverService.saveToFileSystem(result));
  }
}
