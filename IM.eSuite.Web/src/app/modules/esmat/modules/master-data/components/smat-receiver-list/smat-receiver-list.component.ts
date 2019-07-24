import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { AbstractDataTable, PagedList, ListRequest } from '@im-angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { eSmatApiStaticFileService } from '../../../../services/esmat-api-static-file.service';
import { AuthorizationService } from '@im-angular/authentication';
import { PageSizeService } from '../../../../../../services/page-size.service';
import { ListRequestService } from '../../../../../../services/list-request.service';
import { SmatReceiverService } from '../../../../services/smat-receiver.service';
import { SmatReceiverListRequest } from '../../../../models/smat-receiver-list-request.model';
import { SmatReceiverFilter } from '../../models/smat-receiver-filter.model';
import { SmatReceiverList } from '../../../../models/smat-receiver-list.model';
import { SmatReceiverViewModel } from '../../../../viewModels/smat-receiver.viewModel';

@Component({
  selector: 'app-smat-receiver-list',
  templateUrl: './smat-receiver-list.component.html',
  styleUrls: ['./smat-receiver-list.component.less']
})
export class  SmatReceiverListComponent extends AbstractDataTable<SmatReceiverList> implements OnInit {
  @ViewChild('deleteSmatReceiverModal') deleteSmatReceiverModal: ModalDirective;
  @ViewChild('importSmatReceiverModal') importSmatReceiverModal: ModalDirective;

  selectedReceiver: SmatReceiverViewModel = new SmatReceiverViewModel();
  smatReceiverFilter: SmatReceiverFilter;
  templateUrl: string;
  
  constructor(private route: ActivatedRoute, pageSizeService: PageSizeService, private smatReceiverService: SmatReceiverService,
    private eSmatApiStaticFileService: eSmatApiStaticFileService, private listRequestService: ListRequestService, public authorizationService: AuthorizationService) {
    super(pageSizeService);
  }

  ngOnInit() {
    this.data = this.route.snapshot.data['receivers'];
    this.updatePagerVm(1);
    this.templateUrl = this.eSmatApiStaticFileService.getExcelTemplateUrl("esmat_template_smat_receivers.xlsx");
  }

  loadPage(i: number) {
    let request = this.getListRequest(i);
    this.smatReceiverService.list(request).subscribe(response => {
      this.data = response;
      this.updatePagerVm(i);
     });
  }

  onSmatReceiverFiltered(smatReceiverFilter: SmatReceiverFilter){
    this.smatReceiverFilter = smatReceiverFilter;    
    this.loadPage(1);
  }

  onFilterRemoved(){
    this.loadPage(1);  
  }

  onDeleteClicked(receiver: SmatReceiverViewModel){
    this.selectedReceiver = receiver;
    this.deleteSmatReceiverModal.show();
  }

  onSmatReceiverDeleted(smatReceiverId: number){
    this.selectedReceiver = undefined;
    let index = this.data.entries.findIndex(sr => sr.id == smatReceiverId);
    this.data.entries.splice(index, 1);
  }

  onImportClicked(){
    this.importSmatReceiverModal.show();
  }

  onSmatReceiverImported(){
    this.loadPage(1);
  }

  private getListRequest(pageNumber: number): SmatReceiverListRequest {
    let request = this.listRequestService.getListRequest(SmatReceiverListRequest, pageNumber, this.pageSizeVm.pageSize, this.sortVm);

    if(this.smatReceiverFilter){
      request.plantId = this.smatReceiverFilter.plantId;
      request.employeeTypeId = this.smatReceiverFilter.employeeTypeId;
      request.name = this.smatReceiverFilter.name;
    }

    return request;
  }
}