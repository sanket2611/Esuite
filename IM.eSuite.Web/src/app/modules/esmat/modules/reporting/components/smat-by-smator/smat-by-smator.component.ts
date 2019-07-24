import { Component, OnInit, Input } from '@angular/core';
import { AbstractDataTable, PagedList } from '@im-angular/core';
import { ReportingService } from '../../services/reporting.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { ListRequestService } from '../../../../../../services/list-request.service';
import { PageSizeService } from '../../../../../../services/page-size.service';
import { SmatBySmatorRequest } from '../../models/smat-by-smator-request.model';
import { SmatBySmatorGet } from '../../models/smat-by-smator-get.model';
import { ReportingFilterViewModel } from '../../viewModels/reporting-filter.viewModel';

@Component({
  selector: 'app-smat-by-smator',
  templateUrl: './smat-by-smator.component.html',
  styleUrls: ['./smat-by-smator.component.less']
})
export class SmatBySmatorComponent extends AbstractDataTable<SmatBySmatorGet> implements OnInit {
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
    this.data = new PagedList<SmatBySmatorGet>();
    this.data.entries = [];
    this.updatePagerVm(1);

    let locale = this.translateService.getBrowserLang();
    this.months = Array.from(Array(12).keys())
      .map(v => new Date(new Date().getFullYear(),v,1).toLocaleString(locale, { month: "short" }));
  }

  loadPage(i: number) {
    let request = this.getListRequest(i);      
    this.reportingService.getSmatBySmator(request)
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

  getMonthCount(smat: SmatBySmatorGet, month: number){
    let item = smat.smatsByMonth.find(s => s.month == month);
    return item? item.count: 0;
  }

  private getListRequest(pageNumber: number): SmatBySmatorRequest {
    let request = this.listRequestService.getListRequest(SmatBySmatorRequest, pageNumber, this.pageSizeVm.pageSize, this.sortVm);

    if(this.model && this.model.plantId){
      request.plantId = this.model.plantId;      
    }

    if(this.model && this.model.search){
      request.search = this.model.search;      
    }

    return request;
  }
}