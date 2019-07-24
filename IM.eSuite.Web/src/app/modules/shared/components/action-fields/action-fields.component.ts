import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { ResponsibleSelectItem } from '../../models/responsible-select-item.model';
import { SelectItem } from '@im-angular/core';
import { StatusEnum } from '../../../eaction/enums/status.enum';
import { AuthorizationService } from '@im-angular/authentication';
import { DirectoryService } from '../../../administration/services/directory.service';
import { UserService } from '../../../administration/services/user.service';
import { StatusService } from '../../../eaction/services/status.service';

@Component({
  selector: 'app-action-fields',
  templateUrl: './action-fields.component.html',
  styleUrls: ['./action-fields.component.less']
})
export class ActionFieldsComponent implements OnInit, OnDestroy {
  @Input() actionForm: FormGroup;
  @Input() isEditMode: boolean;

  @Input() set plantId(value: number) {    
    this._plantId = value;
    if(this._plantId){
      this.userService.search(undefined, this._plantId, "eAction_Is_ActionResponsible")      
        .subscribe(users => this.responsibles = users.map(u => new ResponsibleSelectItem(u.firstName, u.lastName)));
    }
  }
  get plantId(){
    return this._plantId;
  } 
  
  statuses: Array<string>;
  responsibles: Array<ResponsibleSelectItem>;
  feedbackEmails: Array<SelectItem>;
  private _plantId: number;
  private searchEmailChanged: Subject<string> = new Subject<string>();
  StatusEnum = StatusEnum;
  
  constructor(public authorizationService: AuthorizationService, private statusService: StatusService,   
    private directoryService: DirectoryService, private userService: UserService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.statuses = this.statusService.get();
    this.feedbackEmails = <SelectItem[]>this.actionForm.value.feedbackEmails || [];
    this.searchEmailChanged.asObservable()
      .debounceTime(400)
      .distinctUntilChanged()
      .switchMap(search => this.directoryService.getEmailByName(search))
      .map(emails => emails.map(e => {
        let i = new SelectItem();
        i.text = e;
        return i;
      }))
      .subscribe(emails => {
        let model = <SelectItem[]>this.actionForm.value.feedbackEmails || [];
        this.feedbackEmails = model.concat(emails);
      });
  }

  ngOnDestroy(){
    this.searchEmailChanged.unsubscribe();
  }

  onResponsibleSelected(responsible: string){    
    if(!responsible){
      this.actionForm.patchValue({responsibleFirstName: null});
      this.actionForm.patchValue({responsibleLastName: null});
      return;
    }

    let resp = this.responsibles.find(r => r.text == responsible);
    this.actionForm.patchValue({responsibleFirstName: resp.firstName});
    this.actionForm.patchValue({responsibleLastName: resp.lastName});
  }

  onEmailTyped(name: string) {
    if(name){
      this.searchEmailChanged.next(name);
    }
  }

  isStatus(status: number): boolean {
    return this.actionForm.value.status == StatusEnum[status];
  }

  onStatusSelect(status: string) {    
    this.actionForm.controls.completionDate.validator = undefined;  
    this.actionForm.controls.closingDate.validator = undefined;

    switch (StatusEnum[status]) {
      case StatusEnum.Opened:        
        this.actionForm.patchValue({ completionDate: null});
        this.actionForm.patchValue({ closingDate: null });
        break;
      case StatusEnum.Completed:        
        this.actionForm.controls.completionDate.validator = Validators.required;
        this.actionForm.patchValue({ completionDate: new Date() });
        this.actionForm.patchValue({ closingDate: null });
        break;
      case StatusEnum.Closed:
        this.actionForm.controls.completionDate.validator = Validators.required;
        this.actionForm.controls.closingDate.validator = Validators.required;
        this.actionForm.patchValue({ closingDate: new Date() });
        break;
      case StatusEnum.Cancelled:
        break;
    }
  }
}
