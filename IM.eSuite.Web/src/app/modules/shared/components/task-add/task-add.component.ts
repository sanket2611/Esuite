import { Component, OnInit, Input, Output, EventEmitter, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { SelectItem } from '@im-angular/core';
import { AuthorizationService } from '@im-angular/authentication';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { OrganizationService } from '../../../organization/services/organization.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Organization } from '../../../organization/models/organization';

@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.less']
})
export class TaskAddComponent implements OnInit, OnChanges {
  @Input() modal: BsModalRef;
  @Input() workstation: SelectItem;
  @Input() reset: boolean;
  @Output() resetChange = new EventEmitter<boolean>(true);  
  @Output() addedTaskRequest = new EventEmitter<Organization>();
  @ViewChild("addTaskForm") form: HTMLFormElement;

  task: string;  
  isSaveInProgress: boolean;

  constructor(private organizationService: OrganizationService, private translateService: TranslateService,
    private toastrService: ToastrService, public authorizationService: AuthorizationService ) { }

  ngOnInit() {
    this.workstation = new SelectItem();     
  }

  ngOnChanges(changes: SimpleChanges) {    
    if (changes.reset && changes.reset.currentValue)
    {
      this.form.reset();
      this.resetChange.emit(false);    
    }    
  }

  onSubmit(){
    this.isSaveInProgress = true;
    let task = new Organization();
    task.name = this.task;
    task.parentId = this.workstation.id;

    this.organizationService.create(task)
      .finally(() => this.isSaveInProgress = false)
      .subscribe(
        result => {
          this.translateService.get("Organization.SuccessfullyCreated", { name: task.name })
            .subscribe(message => { 
              this.toastrService.success(message).onHidden.subscribe(() => {
                task.id = result.id;
                this.addedTaskRequest.emit(task);
                this.modal.hide();
              });            
          });
        },
        error => {
          if(error){          
            switch(error.status){
              case 409:
                this.translateService.get("Organization.AlreadyExists", { name: task.name })
                  .subscribe(message => this.toastrService.error(message));
                break;
              default:
                break;
            }
          }
        });
  }
}