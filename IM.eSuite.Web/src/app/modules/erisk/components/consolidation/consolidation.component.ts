import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageSizeService } from '../../../../services/page-size.service';
import { AuthorizationService } from '@im-angular/authentication';
import { AbstractDataTable } from '@im-angular/core';
import { ConsolidationList } from '../../models/consolidation-list.model';
import { ConsolidationService } from '../../services/consolidation.service';
import { OrganizationFilterViewModel } from '../../../shared/viewModels/organization-filter.viewModel';
import { ListRequestService } from '../../../../services/list-request.service';
import { ConsolidationListRequest } from '../../models/consolidation-list-request.model';
import { TranslateService } from '@ngx-translate/core';
import { OrganizationFilterConfiguration } from '../../../shared/models/organization-filter-configuration.model';

@Component({
  selector: 'app-consolidation',
  templateUrl: './consolidation.component.html',
  styleUrls: ['./consolidation.component.less']
})
export class ConsolidationComponent extends AbstractDataTable<ConsolidationList> implements OnInit {
  filterConfiguration: OrganizationFilterConfiguration;
  isDownloadInProgress: boolean;
  locale: string;
  organizationFilter: OrganizationFilterViewModel = new OrganizationFilterViewModel();
  totals: ConsolidationList = new ConsolidationList();

  constructor(private route: ActivatedRoute, private consolidationService: ConsolidationService,
    private listRequestService: ListRequestService, private translateService: TranslateService,
    public authorizationService: AuthorizationService, pageSizeService: PageSizeService) {
    super(pageSizeService);
  }

  ngOnInit() {
    this.locale = this.translateService.currentLang;
    this.data = this.route.snapshot.data['consolidation'];
    this.updatePagerVm(1);
    this.setTotals(this.data.entries);
    this.filterConfiguration = new OrganizationFilterConfiguration();
    this.filterConfiguration.showDateRange = true;
    this.filterConfiguration.showWorkstations = false;
  }

  loadPage(pageNumber: number) {
    let request = this.getListRequest(pageNumber);
    this.consolidationService.list(request).subscribe(response => {
      this.data = response;
      this.setTotals(this.data.entries);
      this.updatePagerVm(pageNumber);
    });
  }

  private setTotals(consolidations: ConsolidationList[]) {
    if(consolidations.length == 0)
    {
      return;
    }

    this.totals = new ConsolidationList();    
    this.totals.critical.count = consolidations.map(c => c.critical.count).reduce((sum, current) => sum + current);
    this.totals.critical.sum = consolidations.map(c => c.critical.sum).reduce((sum, current) => sum + current);
    this.totals.high.count = consolidations.map(c => c.high.count).reduce((sum, current) => sum + current);
    this.totals.high.sum = consolidations.map(c => c.high.sum).reduce((sum, current) => sum + current);
    this.totals.medium.count = consolidations.map(c => c.medium.count).reduce((sum, current) => sum + current);
    this.totals.medium.sum = consolidations.map(c => c.medium.sum).reduce((sum, current) => sum + current);
    this.totals.low.count = consolidations.map(c => c.low.count).reduce((sum, current) => sum + current);
    this.totals.low.sum = consolidations.map(c => c.low.sum).reduce((sum, current) => sum + current);
  }

  onExportClicked() {
  }

  onFilterChanged(organizationFilter: OrganizationFilterViewModel) {
    this.organizationFilter = organizationFilter;
    this.loadPage(1);
  }

  onFilterRemoved() {
    this.organizationFilter = undefined;
    this.loadPage(1);
  }

  private getListRequest(pageNumber: number): ConsolidationListRequest {
    let request = this.listRequestService.getListRequest(ConsolidationListRequest, pageNumber,
      this.pageSizeVm.pageSize, this.sortVm);
    if (this.organizationFilter) {
      request.plantId = this.organizationFilter.plantId;
      request.departmentId = this.organizationFilter.departmentId;
      request.workshopId = this.organizationFilter.workshopId;
      request.jobId = this.organizationFilter.jobId;
      request.workstationId = this.organizationFilter.workstationId;
      if (this.organizationFilter.dateRange) {
        request.startDate = this.organizationFilter.dateRange[0].toISOString();
        request.endDate = this.organizationFilter.dateRange[1].toISOString();
      }
    }
    return request;
  }
}
