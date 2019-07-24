import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PageSizeService } from '../../../../services/page-size.service';
import { AuthorizationService } from '@im-angular/authentication';
import { AbstractDataTable, PagedList, SelectItem, ListRequest, SortViewModel } from '@im-angular/core';
import { FileSaverService } from '../../../../services/file-saver.service';
import { ListRequestService } from '../../../../services/list-request.service';
import { TranslateService } from '@ngx-translate/core';
import { OrganizationFilterViewModel } from '../../../shared/viewModels/organization-filter.viewModel';
import { SafetySheetService } from '../../services/safety-sheet.service';
import { RiskList } from '../../models/risk-list.model';
import { HazardList } from '../../models/hazard-list.model';
import { OrganizationFilterConfiguration } from '../../../shared/models/organization-filter-configuration.model';
import { RiskService } from '../../services/risk-service';
import { RiskListRequest } from '../../models/risk-list-request.model';
import { ModalDirective } from 'ngx-bootstrap';
import { HazardService } from '../../services/hazard.service';
import { HazardListRequest } from '../../models/hazard-list-request';

@Component({
  selector: 'app-risk-assessment',
  templateUrl: './risk-assessment.component.html',
  styleUrls: ['./risk-assessment.component.less']
})
export class RiskAssessmentComponent extends AbstractDataTable<RiskList> implements OnInit {
  @ViewChild('deleteRiskModal') deleteRiskModal: ModalDirective;
  @ViewChild('copyRiskModal') copyRiskModal: ModalDirective;
  @ViewChild('updateDateRiskModal') updateDateRiskModal: ModalDirective;
  @ViewChild('importRiskModal')  importRiskModal: ModalDirective;
  isDownloadInProgress: boolean;
  isExportInProgress: boolean;
  allSelected: boolean;
  locale: string;
  organizationFilter: OrganizationFilterViewModel = new OrganizationFilterViewModel();
  filterConfiguration: OrganizationFilterConfiguration;
  hazardId: number;
  hazards: Array<SelectItem>;
  selectedRiskIds: number[];
  selectedHazardId: number;

  constructor(private route: ActivatedRoute, private riskService: RiskService,
    private safetySheetService: SafetySheetService, private fileSaverService: FileSaverService,
    private listRequestService: ListRequestService, public authorizationService: AuthorizationService,
    private translateService: TranslateService, pageSizeService: PageSizeService, private router: Router, private hazardService: HazardService) {
    super(pageSizeService);

    this.filterConfiguration = new OrganizationFilterConfiguration();
    this.filterConfiguration.showDateRange = false;
  }

  ngOnInit() {
    this.locale = this.translateService.currentLang;
    this.data = this.route.snapshot.data['assessment'];


    this.selectedRiskIds = [];

    this.updatePagerVm(1);
  }

  loadHazards(plantId: number) {
    this.hazards  = new Array<SelectItem>();
    if (plantId) {
      let request = this.getHazadsListRequest(plantId);
      this.hazardService.list(request).subscribe(
        response => {
          let hazardList = response;
          this.hazards = hazardList.entries.map(p => HazardList.toSelectItem(p));
        }
      );
    }
  }

  loadPage(pageNumber: number) {
    let request = this.getListRequest(pageNumber);
    this.riskService.list(request).subscribe(response => {
      this.data = response;
      this.updatePagerVm(pageNumber);
    });
  }

  onExportClicked() {
    this.isExportInProgress = true;
    this.riskService.export(this.selectedRiskIds)
      .finally(() => {
        this.isExportInProgress = false;
      }
      )
      .subscribe(result => this.fileSaverService.saveToFileSystem(result))
  }

  onTemplateClicked()
  {
    this.riskService.template()
      .subscribe(result => this.fileSaverService.saveToFileSystem(result))
  }

  onImportClicked()
  {
    this.importRiskModal.show();
  }

  onFilterChanged(historyFilter: OrganizationFilterViewModel) {
    this.organizationFilter = historyFilter;
    this.loadPage(1);
  }

  onPlantChanged(plantId: number) {
    this.loadHazards(plantId);
  }

  onFilterRemoved() {
    this.organizationFilter = undefined;
    this.loadPage(1);
  }

  onCopyClicked() {
    this.copyRiskModal.show();
  }

  onRiskCopied() {
    this.unSelectAll();
    this.loadPage(1);
  }

  onNoChangeClicked() {
    this.updateDateRiskModal.show();
  }

  OnDateUpdated() {
    this.loadPage(1);
    this.unSelectAll();
  }

  onSelectAllClicked() {
    this.allSelected = !this.allSelected;
    this.selectedRiskIds = [];
    this.data.entries.forEach(r => {
      r.selected = this.allSelected;
      if (r.selected) {
        this.selectedRiskIds.push(r.id);
      }
    });
  }

  onRiskChanged(risk: RiskList) {
    risk.selected = !risk.selected;
    if (risk.selected && !this.selectedRiskIds.some(r => r == risk.id)) {
      this.selectedRiskIds.push(risk.id);
    }
    else if (!risk.selected && this.selectedRiskIds.some(r => r == risk.id)) {
      var index = this.selectedRiskIds.indexOf(risk.id);
      this.selectedRiskIds.splice(index, 1);
    }

    this.allSelected = (this.data.entries.length == this.selectedRiskIds.length);
  }

  onDeleteClicked() {
    this.deleteRiskModal.show();
  }

  onRiskDeleted() {
    this.unSelectAll();
    this.loadPage(1);
  }


  onSafetySheetClicked(workstationId: number) {
    this.isDownloadInProgress = true;
    this.safetySheetService.get(workstationId)
      .finally(() => this.isDownloadInProgress = false)
      .subscribe(result => this.fileSaverService.saveToFileSystem(result));
  }

  private getListRequest(pageNumber: number): RiskListRequest {
    let request = this.listRequestService.getListRequest(RiskListRequest, pageNumber,
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
    if (this.selectedHazardId) {
      request.hazardId = this.selectedHazardId;
    }
    return request;
  }

  onHazardSelected(hazardId: number) {
    this.selectedHazardId = hazardId;
  }

  onHazardRemoved() {
    this.selectedHazardId = undefined;
  }

  getScoreBackgroundColor(score: number) {
    if (score < 20) {
      return 'bg-green';
    } else if (score >= 20 && score < 210) {
      return 'bg-yellow';
    } else if (score >= 210 && score < 600) {
      return 'bg-red';
    }
    return 'bg-navy';
  }

  getlastEvaluationDateBackgroundColor(evaluationDateValue: string) {
    let date = new Date();
    let evaluationDate = new Date(evaluationDateValue);
    date.setFullYear(date.getFullYear() - 1);
    if (date > evaluationDate) {
      return 'bg-red';
    }
    return '';
  }

  private unSelectAll(): void {
    this.selectedRiskIds = [];
    this.allSelected = false;
  }

  private getHazadsListRequest(plantId : number): HazardListRequest {
    let pageNumber = 1;
    let sortVm = new SortViewModel();
    sortVm.sortBy = 'description';
    let request = this.listRequestService.getListRequest(ListRequest, pageNumber, 50, sortVm);
    let hazardListRequest: HazardListRequest = new HazardListRequest(request, plantId,true);
    return hazardListRequest;
  }

}
