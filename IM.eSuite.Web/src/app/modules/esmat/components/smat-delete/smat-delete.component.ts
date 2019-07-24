import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { SmatService } from '../../services/smat.service';

@Component({
  selector: 'app-smat-delete',
  templateUrl: './smat-delete.component.html',
  styleUrls: ['./smat-delete.component.less']
})
export class SmatDeleteComponent implements OnInit {
  @Input()smatId: number;
  @Input()modal: BsModalRef;
  @Output()deletedSmatRequest = new EventEmitter<number>();

  constructor(private smatService: SmatService, private toastrService: ToastrService,
    private translateService: TranslateService) { }

  ngOnInit() {
  }

  onDeleteClicked(){
    this.smatService.delete(this.smatId)
      .subscribe(response => {
        this.translateService.get("eSMAT.Smat.SuccessfullyDeleted", {id: this.smatId})
          .mergeMap(message => this.toastrService.success(message).onHidden)          
          .subscribe(() => {
            this.deletedSmatRequest.emit(this.smatId);          
            this.modal.hide();
          });
      }, error => {
        this.translateService.get("eSMAT.Smat.ErrorDeleted", {id: this.smatId})
          .subscribe(message => this.toastrService.error(message));
      });      
  }
}