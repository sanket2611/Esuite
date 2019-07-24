import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { SmatReceiverService } from '../../../../services/smat-receiver.service';
import { SmatReceiverViewModel } from '../../../../viewModels/smat-receiver.viewModel';

@Component({
  selector: 'app-smat-receiver-delete',
  templateUrl: './smat-receiver-delete.component.html',
  styleUrls: ['./smat-receiver-delete.component.less']
})
export class SmatReceiverDeleteComponent implements OnInit {
  @Input()receiver: SmatReceiverViewModel;
  @Input()modal: BsModalRef;
  @Output()deletedSmatReceiverRequest = new EventEmitter<number>();
  
  constructor(private smatReceiverService: SmatReceiverService, private toastrService: ToastrService,
    private translateService: TranslateService) { }

  ngOnInit() {
  }

  onDeleteClicked(){
    this.smatReceiverService.delete(this.receiver.id)
      .subscribe(response => {
        this.translateService.get("eSMAT.SmatReceiver.SuccessfullyDeleted", this.receiver)
          .mergeMap(message => this.toastrService.success(message).onHidden)          
          .subscribe(() => {
            this.deletedSmatReceiverRequest.emit(this.receiver.id);          
            this.modal.hide();
          });
      }, error => {
        this.translateService.get("eSMAT.SmatReceiver.ErrorDeleted", this.receiver)
          .subscribe(message => this.toastrService.error(message));
      });      
  }
}
