import { Component, OnInit, Input } from '@angular/core';
import { AbstractDataTable, PagedList } from '@im-angular/core';
import { PageSizeService } from '../../../../../../services/page-size.service';
import { SmatByEmployeeRequest } from '../../models/smat-by-employee-request.model';
import { ListRequestService } from '../../../../../../services/list-request.service';
import { ReportingService } from '../../services/reporting.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { ReportingFilterViewModel } from '../../viewModels/reporting-filter.viewModel';
import { SmatByEmployeeGet } from '../../models/smat-by-employee-get.model';

@Component({
  selector: 'app-smat-by-employee',
  templateUrl: './smat-by-employee.component.html',
  styleUrls: ['./smat-by-employee.component.less']
})
export class SmatByEmployeeComponent extends AbstractDataTable<SmatByEmployeeGet> implements OnInit{
  months: string[];
  private _model: ReportingFilterViewModel;
  
  @Input() get model(): ReportingFilterViewModel {
    return this._model;
  }  
  set model(value: ReportingFilterViewModel) {
    this._model = value;
    if(value && value.plantId){
      this.loadPage(1);
    }    
  }

  constructor(private reportingService: ReportingService, private translateService: TranslateService, private toastrService: ToastrService, 
    private listRequestService: ListRequestService, pageSizeService: PageSizeService) { 
    super(pageSizeService);
  }

  ngOnInit() {
    this.data = new PagedList<SmatByEmployeeGet>();
    this.data.entries = [];
    this.updatePagerVm(1);

    let locale = this.translateService.getBrowserLang();
    this.months = Array.from(Array(12).keys())
      .map(v => new Date(new Date().getFullYear(),v,1).toLocaleString(locale, { month: "short" }));
  }

  loadPage(i: number) {
    let request = this.getListRequest(i);      
    this.reportingService.getSmatByEmployee(request)
      .subscribe(data => {
        if(!data || data.entries.length == 0){
          this.translateService.get("eSMAT.Reporting.NoResult")
            .subscribe(message => this.toastrService.warning(message));          
          return;
        }
        this.data = data;
        this.updatePagerVm(i);
      });   
  }

  getMonthCount(smat: SmatByEmployeeGet, month: number){
    let item = smat.smatsByMonth.find(s => s.month == month);
    return item? item.count: 0;
  }

  private getListRequest(pageNumber: number): SmatByEmployeeRequest {
    let request = this.listRequestService.getListRequest(SmatByEmployeeRequest, pageNumber, this.pageSizeVm.pageSize, this.sortVm);

    if(this.model && this.model.plantId){
      request.plantId = this.model.plantId;      
    }

    if(this.model && this.model.search){
      request.search = this.model.search;      
    }

    return request;
  }
}