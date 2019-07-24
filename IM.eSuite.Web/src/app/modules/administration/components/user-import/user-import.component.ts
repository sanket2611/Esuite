import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from '../../services/user.service';
import { ImportError } from '../../../../models/importError';

@Component({
  selector: 'app-user-import',
  templateUrl: './user-import.component.html',
  styleUrls: ['./user-import.component.less']
})
export class UserImportComponent implements OnInit {
  @Input()modal: BsModalRef;
  @Output()importedUserRequest = new EventEmitter<void>();
  @ViewChild("fileInput") fileInput: ElementRef;
  usersFile: File;
  errors: Array<ImportError>;
  isImportInProgress: boolean;
  
  constructor(private userService: UserService, private toastrService: ToastrService,
    private translateService: TranslateService) { }

  ngOnInit() {
  }

  onUsersFileChanged(event: Event){    
    this.usersFile = undefined;
    let input = (<HTMLInputElement>event.target);

    if(input.files && input.files[0]){
      this.usersFile = input.files[0];
    }
  }

  onCloseClicked(){    
    let input = (<HTMLInputElement>this.fileInput.nativeElement);
    input.value = null;
    this.usersFile = undefined;
    this.errors = undefined;
    this.modal.hide();
  }

  onImportSubmitted(){
    this.isImportInProgress = true;
    let formData = new FormData();
    formData.append("file", this.usersFile);

    this.userService.import(formData)
      .finally(() => this.isImportInProgress = false)
      .subscribe(response => {
        this.translateService.get("Administration.Users.SuccessfullyImported", response)
          .mergeMap(message => this.toastrService.success(message).onShown)
          .subscribe(() => {
            if(response.errors && response.errors.length > 0)
            {
              this.errors = response.errors;
            }
            else
            {
              this.usersFile = undefined;
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