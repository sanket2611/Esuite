import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { ImportError } from '../../../../models/importError';
import { RiskService } from '../../services/risk-service';

@Component({
  selector: 'app-risk-import',
  templateUrl: './risk-import.component.html',
  styleUrls: ['./risk-import.component.less']
})
export class RiskImportComponent implements OnInit {
  @Input()modal: BsModalRef;
  @Output()importedUserRequest = new EventEmitter<void>();
  @ViewChild("fileInput") fileInput: ElementRef;
  risksFile: File;
  errors: Array<ImportError>;
  isImportInProgress: boolean;
  
  constructor(private riskService: RiskService, private toastrService: ToastrService,
    private translateService: TranslateService) { }

  ngOnInit() {
  }

  onRisksFileChanged(event: Event){    
    this.risksFile = undefined;
    let input = (<HTMLInputElement>event.target);

    if(input.files && input.files[0]){
      this.risksFile = input.files[0];
    }
  }

  onCloseClicked(){    
    let input = (<HTMLInputElement>this.fileInput.nativeElement);
    input.value = null;
    this.risksFile = undefined;
    this.errors = undefined;
    this.modal.hide();
  }

  onImportSubmitted(){
    this.isImportInProgress = true;
    let formData = new FormData();
    formData.append("file", this.risksFile);

    this.riskService.import(formData)
      .finally(() => this.isImportInProgress = false)
      .subscribe(response => {
        this.translateService.get("eRisk.SuccessfullyImported", response)
          .mergeMap(message => this.toastrService.success(message).onShown)
          .subscribe(() => {
            if(response.errors && response.errors.length > 0)
            {
              this.errors = response.errors;
            }
            else
            {
              this.risksFile = undefined;
              this.importedUserRequest.emit();
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