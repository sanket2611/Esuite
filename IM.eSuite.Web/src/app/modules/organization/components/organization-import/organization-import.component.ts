import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { OrganizationService } from '../../services/organization.service';
import { ImportError } from '../../../../models/importError';

@Component({
  selector: 'app-organization-import',
  templateUrl: './organization-import.component.html',
  styleUrls: ['./organization-import.component.less']
})
export class OrganizationImportComponent implements OnInit {
  @Input()modal: BsModalRef;
  @Output()importedOrganiztionRequest = new EventEmitter<void>();
  @ViewChild("fileInput") fileInput: ElementRef;
  organizationsFile: File;
  errors: Array<ImportError>;
  isImportInProgress: boolean;
  
  constructor(private organizationService: OrganizationService, private toastrService: ToastrService,
    private translateService: TranslateService) { }

  ngOnInit() {
  }

  onOrganizationsFileChanged(event: Event){    
    this.organizationsFile = undefined;
    let input = (<HTMLInputElement>event.target);

    if(input.files && input.files[0]){
      this.organizationsFile = input.files[0];
    }
  }

  onCloseClicked(){    
    let input = (<HTMLInputElement>this.fileInput.nativeElement);
    input.value = null;
    this.organizationsFile = undefined;
    this.errors = undefined;
    this.modal.hide();
  }

  onImportSubmitted(){
    this.isImportInProgress = true;
    let formData = new FormData();
    formData.append("file", this.organizationsFile);

    this.organizationService.import(formData)
      .finally(() => this.isImportInProgress = false)
      .subscribe(response => {
        this.translateService.get("Organization.SuccessfullyImported", response)
          .mergeMap(message => this.toastrService.success(message).onShown)
          .subscribe(() => {
            if(response.errors && response.errors.length > 0)
            {
              this.errors = response.errors;
            }
            else
            {
              this.organizationsFile = undefined;
              this.importedOrganiztionRequest.emit();
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