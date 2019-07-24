import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AbstractDataTable } from '@im-angular/core';
import { AuthorizationService } from '@im-angular/authentication';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { PageSizeService } from '../../../../../../services/page-size.service';
import { ListRequestService } from '../../../../../../services/list-request.service';
import { EpiService } from '../../../../services/epi.service';
import { EpiList } from '../../../../models/epi-list.model';
import { EpiListRequest } from '../../../../models/epi-list-request.model';
import { EpiCategoryFilterViewModel } from '../../viewModels/epi-category-filter.viewModel';
import { EpiPlantException } from '../../models/epi-plant-exception';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { EpiPlantService } from '../../../../services/epi-plant-service';
import { ToastrService } from '../../../../../../../../node_modules/ngx-toastr';

@Component({
  selector: 'app-epi-list',
  templateUrl: './epi-list.component.html',
  styleUrls: ['./epi-list.component.less']
})
export class EpiListComponent extends AbstractDataTable<EpiList> implements OnInit {
  categoryId: number;
  plantId: number;
  selectedEpi: EpiList;
  @ViewChild('deleteEpiModal') deleteEpiModal: ModalDirective;

  constructor(pageSizeService: PageSizeService, private route: ActivatedRoute, private listRequestService: ListRequestService,
    private epiService: EpiService,private epiPlantService : EpiPlantService, public authorizationService: AuthorizationService,
    private translateService : TranslateService, private toastrService : ToastrService) {
    super(pageSizeService);
  }

  ngOnInit() {

  }

  loadPage(i: number) {
    let request = this.getListRequest(i);
    this.epiService.list(request)
      .subscribe(epis => {
        this.data = epis;
        this.updatePagerVm(i);
      });
  }

  onFilterChanged(epiCategoryFilter: EpiCategoryFilterViewModel) {
    this.categoryId = epiCategoryFilter.epiCategoryId;
    this.plantId = epiCategoryFilter.plantId;
    this.data = null;
    if (this.plantId) {
      this.sortVm.sortBy = 'isStandard';
      this.sortVm.isDescending = true;
      this.loadPage(1);
    }
  }

  onDeleteEpiClicked(epi: EpiList) {
    this.selectedEpi = epi;
    this.deleteEpiModal.show();
  }

  onEpiDeleted(epiId: number) {
    this.selectedEpi = undefined;
    let index = this.data.entries.findIndex(c => c.id == epiId);
    this.data.entries.splice(index, 1);
  }

  onEnablementUpdate(epiId : number,event : any){

    let epiPlantException: EpiPlantException = new EpiPlantException(epiId, this.plantId);
    let operation: Observable<any>;
    if (event.target.checked == true) {
      operation = this.epiPlantService.delete(epiPlantException);
    }
    else {
      operation = this.epiPlantService.create(epiPlantException);
    } 
    operation.subscribe(
      () => {
        this.translateService.get('eRisk.EPIManagement.SuccessfullyStatusUpdate').
          subscribe(message => this.toastrService.success(message).onHidden)
      },
      // error 
      () => {
        this.translateService.get('eRisk.EPIManagement.ErrorStatusUpdate')
          .subscribe(message => this.toastrService.error(message));
      }
    );
  }

  private getListRequest(pageNumber: number): EpiListRequest {
    let request = this.listRequestService.getListRequest(EpiListRequest, pageNumber, this.pageSizeVm.pageSize, this.sortVm);
    request.epiCategoryId = this.categoryId;
    request.plantId = this.plantId;
    return request;
  }
}