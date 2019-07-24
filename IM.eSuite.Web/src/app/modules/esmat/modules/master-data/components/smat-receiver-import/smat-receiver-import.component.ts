import { Component, OnInit, Input, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { SmatReceiverService } from '../../../../services/smat-receiver.service';
import { ImportError } from '../../../../../../models/importError';

@Component({
  selector: 'app-smat-receiver-import',
  templateUrl: './smat-receiver-import.component.html',
  styleUrls: ['./smat-receiver-import.component.less']
})
export class SmatReceiverImportComponent implements OnInit {
  @Input()modal: BsModalRef;
  @Output()importedSmatReceiverRequest = new EventEmitter<void>();
  @ViewChild("fileInput") fileInput: ElementRef;
  receiversFile: File;
  errors: Array<ImportError>;
  isImportInProgress: boolean;
  
  constructor(private smatReceiverService: SmatReceiverService, private toastrService: ToastrService,
    private translateService: TranslateService) { }

  ngOnInit() {
  }

  onReceiverFileChanged(event: Event){    
    this.receiversFile = undefined;
    let input = (<HTMLInputElement>event.target);

    if(input.files && input.files[0]){
      this.receiversFile = input.files[0];
    }
  }

  onCloseClicked(){    
    let input = (<HTMLInputElement>this.fileInput.nativeElement);
    input.value = null;
    this.receiversFile = undefined;
    this.errors = undefined;
    this.modal.hide();
  }

  onImportSubmitted(){
    this.isImportInProgress = true;
    let formData = new FormData();
    formData.append("file", this.receiversFile);

    this.smatReceiverService.import(formData)
      .finally(() => this.isImportInProgress = false)
      .subscribe(response => {
        this.translateService.get("eSMAT.SmatReceiver.SuccessfullyImported", response)
          .mergeMap(message => this.toastrService.success(message).onShown)
          .subscribe(() => {
            if(response.errors && response.errors.length > 0)
            {
              this.errors = response.errors;
            }
            else
            {
              this.receiversFile = undefined;
              this.importedSmatReceiverRequest.emit();
              this.modal.hide();
            } 
          });        
      },
      error => {
        this.toastrService.error(error.error);
      }
    );    
  }
}
