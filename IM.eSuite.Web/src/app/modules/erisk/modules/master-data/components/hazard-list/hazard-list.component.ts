import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { AbstractDataTable, ListRequest, SelectItem } from '@im-angular/core';
import { AuthorizationService } from '@im-angular/authentication';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { PageSizeService } from '../../../../../../services/page-size.service';
import { ListRequestService } from '../../../../../../services/list-request.service';
import { HazardService } from '../../../../services/hazard.service';
import { HazardPlantService } from '../../../../services/hazard-plant.service';
import { HazardList } from '../../../../models/hazard-list.model';
import { HazardPlantException } from '../../models/hazard-plant-exception.model';
import { HazardListRequest } from '../../../../models/hazard-list-request';
import { Plant } from '../../../../../organization/models/plant';



@Component({
  selector: 'app-hazard-list',
  templateUrl: './hazard-list.component.html',
  styleUrls: ['./hazard-list.component.less']
})
export class HazardListComponent extends AbstractDataTable<HazardList> implements OnInit {

  selectedHazard: HazardList;
  plantId: number;
  plants: Array<SelectItem>;
  plant : Plant;
  hazards: Array<HazardList> = [];
  @ViewChild('deleteHazardModal') deleteHazardModal: ModalDirective;
  isInProgress: boolean = false;

  constructor(pageSizeService: PageSizeService, private route: ActivatedRoute, private listRequestService: ListRequestService,
    private hazardService: HazardService,private hazardPlantService  : HazardPlantService,public authorizationService: AuthorizationService,
    private translateService: TranslateService, private toastrService: ToastrService) {
    super(pageSizeService);
  }

  ngOnInit() {
    let plantList = this.route.snapshot.data['plants'];
    this.plants = plantList.entries.map(p => Plant.toSelectItem(p));

    this.plant = this.route.snapshot.data['plant'];
    if(this.plant)
    {
      this.plantId = this.plant.id;
      this.loadPage(1);
    }
  }

  loadPage(i: number) {
    let request = this.getListRequest(i);
    this.isInProgress = true;
    this.hazardService.list(request).finally(() => this.isInProgress = false)
      .subscribe(hazards => {
        this.data = hazards;
        this.updatePagerVm(i);
      });
  }

  onHazardSearchClicked() {
    this.sortVm.sortBy = 'isStandard';
    this.sortVm.isDescending = true;
    this.loadPage(1);
  }

  onDeleteHazardClicked(hazard: HazardList) {
    this.selectedHazard = hazard;
    this.deleteHazardModal.show();
  }

  onHazardDeleted(hazardId: number) {
    this.selectedHazard = undefined;
    let index = this.data.entries.findIndex(c => c.id == hazardId);
    this.data.entries.splice(index, 1);
  }

  onPlantSelected() {
    this.data = null;
  }
  onPlantRemoved() {
    this.data = null;
  }

  onEnablementUpdate(hazardId: number, event: any) {

    let hazardPlantException: HazardPlantException = new HazardPlantException(hazardId, this.plantId);
    let operation: Observable<any>;
    if (event.target.checked == true) {
      operation = this.hazardPlantService.delete(hazardPlantException);
    }
    else {
      operation = this.hazardPlantService.create(hazardPlantException);
    } 
    operation.subscribe(
      response => {
        this.translateService.get('eRisk.HazardManagement.SuccessfullyStatusUpdate').
          subscribe(message => this.toastrService.success(message).onHidden)
      },
      // error 
      () => {
        this.translateService.get('eRisk.HazardManagement.ErrorStatusUpdate')
          .subscribe(message => this.toastrService.error(message));
      }
    );
  }

  private getListRequest(pageNumber: number): HazardListRequest {
    let request = this.listRequestService.getListRequest(ListRequest, pageNumber, this.pageSizeVm.pageSize, this.sortVm);
    let hazardListRequest: HazardListRequest = new HazardListRequest(request, this.plantId);
    return hazardListRequest;
  }
}