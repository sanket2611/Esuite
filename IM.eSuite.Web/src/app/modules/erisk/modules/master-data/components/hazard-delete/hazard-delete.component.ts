import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { HazardService } from '../../../../services/hazard.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { HazardList } from '../../../../models/hazard-list.model';

@Component({
  selector: 'app-hazard-delete',
  templateUrl: './hazard-delete.component.html',
  styleUrls: ['./hazard-delete.component.less']
})
export class HazardDeleteComponent implements OnInit {
  @Input() hazard: HazardList;
  @Input() modal: BsModalRef;
  @Output() deletedHazardRequest = new EventEmitter<number>();
  
  constructor(private hazardService: HazardService, private toastrService: ToastrService,
    private translateService: TranslateService) { }

  ngOnInit() {
  }

  onDeleteClicked(){
    this.hazardService.delete(this.hazard.id)
      .subscribe(() => {
        this.translateService.get("eRisk.HazardManagement.SuccessfullyDeleted", this.hazard)
          .mergeMap(message => this.toastrService.success(message).onHidden)          
          .subscribe(() => {
            this.deletedHazardRequest.emit(this.hazard.id);
            this.modal.hide();
          });
        }, () => {
          this.translateService.get("eRisk.HazardManagement.ErrorDeleted", this.hazard)
            .subscribe(message => this.toastrService.error(message));
        });      
  }
}