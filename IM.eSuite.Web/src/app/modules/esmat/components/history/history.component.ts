import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AbstractDataTable } from '@im-angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { TranslateService } from '@ngx-translate/core';
import { AuthorizationService } from '@im-angular/authentication';
import { PageSizeService } from '../../../../services/page-size.service';
import { ListRequestService } from '../../../../services/list-request.service';
import { ScheduleService } from '../../services/schedule.service';
import { ScheduleList } from '../../models/schedule-list.model';
import { ScheduleListRequest } from '../../models/schedule-list-request.model';
import { OrganizationFilterViewModel } from '../../../shared/viewModels/organization-filter.viewModel';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.less']
})
export class HistoryComponent extends AbstractDataTable<ScheduleList> implements OnInit {
  @ViewChild('deleteSmatModal') deleteSmatModal: ModalDirective;
  selectedSmatId: number;
  locale: string;
  historyFilter: OrganizationFilterViewModel;

  constructor(private route: ActivatedRoute, pageSizeService: PageSizeService, private scheduleService: ScheduleService,
    private translateService: TranslateService, private listRequestService: ListRequestService,
    public authorizationService: AuthorizationService) { 
      super(pageSizeService);
  }

  ngOnInit() {
    this.locale = this.translateService.currentLang;
    this.data = this.route.snapshot.data['smats'];
    this.updatePagerVm(1);
  }

  loadPage(i: number){
    let request = this.getListRequest(i);
    this.scheduleService.list(request).subscribe(response => {
      this.data = response;
      this.updatePagerVm(i);
     });
  }

  onHistoryFiltered(historyFilter: OrganizationFilterViewModel){
    this.historyFilter = historyFilter;
    this.loadPage(1);
  }

  onFilterRemoved(){
    this.historyFilter = undefined;
    this.loadPage(1);
  }

  onDeleteClicked(smatId: number){
    this.selectedSmatId = smatId;
    this.deleteSmatModal.show();
  }

  onSmatDeleted(smatId: number){
    this.selectedSmatId = undefined;
    let index = this.data.entries.findIndex(s => s.smatId == smatId);
    this.data.entries.splice(index, 1);
  }

  private getListRequest(pageNumber: number): ScheduleListRequest {
    let request = this.listRequestService.getListRequest(ScheduleListRequest, pageNumber,
      this.pageSizeVm.pageSize, this.sortVm);
    request.havingSmat = true;

    if(this.historyFilter){
      request.plantId = this.historyFilter.plantId;
      request.departmentId = this.historyFilter.departmentId;
      request.workshopId = this.historyFilter.workshopId;
      request.jobId = this.historyFilter.jobId;
      request.workstationId = this.historyFilter.workstationId;
      if(this.historyFilter.dateRange){
        request.startDate = this.historyFilter.dateRange[0].toISOString();
        request.endDate = this.historyFilter.dateRange[1].toISOString();
      }      
    }

    return request;
  }
}