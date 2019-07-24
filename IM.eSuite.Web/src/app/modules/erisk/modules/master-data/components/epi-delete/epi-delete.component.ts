import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { EpiService } from '../../../../services/epi.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { EpiList } from '../../../../models/epi-list.model';

@Component({
  selector: 'app-epi-delete',
  templateUrl: './epi-delete.component.html',
  styleUrls: ['./epi-delete.component.less']
})
export class EpiDeleteComponent implements OnInit {
  @Input() epi: EpiList;
  @Input() modal: BsModalRef;
  @Output() deletedEpiRequest = new EventEmitter<number>();
  
  constructor(private epiService: EpiService, private toastrService: ToastrService,
    private translateService: TranslateService) { }

  ngOnInit() {
  }

  onDeleteClicked(){
    this.epiService.delete(this.epi.id)
      .subscribe(() => {
        this.translateService.get("eRisk.EPIManagement.SuccessfullyDeleted", this.epi)
          .mergeMap(message => this.toastrService.success(message).onHidden)          
          .subscribe(() => {
            this.deletedEpiRequest.emit(this.epi.id);
            this.modal.hide();
          });
        }, () => {
          this.translateService.get("eRisk.EPIManagement.ErrorDeleted", this.epi)
            .subscribe(message => this.toastrService.error(message));
        });      
  }
}