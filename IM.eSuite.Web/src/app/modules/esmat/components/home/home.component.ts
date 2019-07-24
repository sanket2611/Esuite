import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { AbstractDataTable, PagedList, SelectItem } from '@im-angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { Subscription } from 'rxjs/Subscription';
import { TranslateService } from '@ngx-translate/core';
import { AuthorizationService } from '@im-angular/authentication';
import { PageSizeService } from '../../../../services/page-size.service';
import { ListRequestService } from '../../../../services/list-request.service';
import { FileSaverService } from '../../../../services/file-saver.service';
import { PlantSearchService } from '../../../organization/services/plant-search.service';
import { ScheduleService } from '../../services/schedule.service';
import { Plant } from '../../../organization/models/plant';
import { ScheduleList } from '../../models/schedule-list.model';
import { ScheduleListRequest } from '../../models/schedule-list-request.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent extends AbstractDataTable<ScheduleList> implements OnInit, OnDestroy {
  @ViewChild('deleteScheduleModal') deleteScheduleModal: ModalDirective;
  @ViewChild('importScheduleModal') importScheduleModal: ModalDirective;
  plants: Array<SelectItem>;
  plantId: number;
  selectedScheduleId: number;
  locale: string;
  isExportInProgress: boolean;
  private subscription: Subscription;

  constructor(private route: ActivatedRoute, private pageSizeService: PageSizeService, private scheduleService: ScheduleService,
    private fileSaverService: FileSaverService, private plantSearchService: PlantSearchService, private translateService: TranslateService, 
    private listRequestService: ListRequestService, public authorizationService: AuthorizationService) { 
    super(pageSizeService);
  }

  ngOnInit() {
    this.locale = this.translateService.currentLang;
    
    let plantList: PagedList<Plant> = this.route.snapshot.data['plants'];
    this.plants = plantList.entries.map(p => Plant.toSelectItem(p));
    this.subscription = this.plantSearchService.debounceSearchPlant()
      .subscribe(result => this.plants = result);
    
    this.data = this.route.snapshot.data['schedules'];
    this.updatePagerVm(1);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  loadPage(i: number){
    let request = this.getListRequest(i);
    this.scheduleService.list(request).subscribe(response => {
      this.data = response;
      this.updatePagerVm(i);
     });
  }  

  onPlantSearchChanged(search: string){
    this.plantSearchService.onPlantSearchChanged(search);
  }

  onImportClicked(){
    this.importScheduleModal.show();
  }

  onScheduleImported(){
    this.loadPage(1);
  }

  onExportClicked(){
    this.isExportInProgress = true;
    this.scheduleService.export(this.plantId)
      .finally(() => this.isExportInProgress = false)
      .subscribe(result => this.fileSaverService.saveToFileSystem(result));
  }

  onDeleteClicked(scheduleId: number){
    this.selectedScheduleId = scheduleId;
    this.deleteScheduleModal.show();
  }

  onScheduleDeleted(scheduleId: number){
    this.selectedScheduleId = undefined;
    let index = this.data.entries.findIndex(s => s.id == scheduleId);
    this.data.entries.splice(index, 1);
  }

  private getListRequest(pageNumber: number): ScheduleListRequest {
    let request = this.listRequestService.getListRequest(ScheduleListRequest, pageNumber, 
      this.pageSizeVm.pageSize, this.sortVm);    
    request.havingSmat = false;

    if(this.plantId){
      request.plantId = this.plantId;      
    }

    return request;
  }  
}