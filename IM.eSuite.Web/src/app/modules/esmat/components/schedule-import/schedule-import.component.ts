import { Component, OnInit, Input, Output, ViewChild, EventEmitter, ElementRef } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ImportError } from '../../../../models/importError';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { ScheduleService } from '../../services/schedule.service';

@Component({
  selector: 'app-schedule-import',
  templateUrl: './schedule-import.component.html',
  styleUrls: ['./schedule-import.component.less']
})
export class ScheduleImportComponent implements OnInit {
  @Input()modal: BsModalRef;
  @Output()importedScheduleRequest = new EventEmitter<void>();
  @ViewChild("fileInput") fileInput: ElementRef;
  schedulesFile: File;
  errors: Array<ImportError>;
  isImportInProgress: boolean;

  constructor(private scheduleService: ScheduleService, private toastrService: ToastrService,
    private translateService: TranslateService) { }

  ngOnInit() {
  }

  onScheduleFileChanged(event: Event){    
    this.schedulesFile = undefined;
    let input = (<HTMLInputElement>event.target);

    if(input.files && input.files[0]){
      this.schedulesFile = input.files[0];
    }
  }

  onCloseClicked(){    
    let input = (<HTMLInputElement>this.fileInput.nativeElement);
    input.value = null;
    this.schedulesFile = undefined;
    this.errors = undefined;
    this.modal.hide();
  }

  onImportSubmitted(){
    this.isImportInProgress = true;
    let formData = new FormData();
    formData.append("file", this.schedulesFile);

    this.scheduleService.import(formData)
      .finally(() => this.isImportInProgress = false)
      .subscribe(response => {
        this.translateService.get("eSMAT.Schedule.SuccessfullyImported", response)
          .mergeMap(message => this.toastrService.success(message).onShown)
          .subscribe(() => {
            if(response.errors && response.errors.length > 0)
            {
              this.errors = response.errors;
            }
            else
            {
              this.schedulesFile = undefined;
              this.importedScheduleRequest.emit();
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