import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { AuthorizationService } from '@im-angular/authentication';
import { EsmatActionPlanService } from '../../services/esmat-action-plan.service';
import { ObservationService } from '../../services/observation.service';
import { ActionViewModel } from '../../viewModels/action.viewModel';
import { ActionPlanGet } from '../../../eaction/models/action-plan-get.model';
import { Observable } from 'rxjs/Observable';
import { mergeMap } from 'rxjs/operators';
import { ObservationSave } from '../../models/observation-save.model';
import { ScheduleGet } from '../../models/schedule-get.model';

@Component({
  selector: 'app-action-modal',
  templateUrl: './action-modal.component.html',
  styleUrls: ['./action-modal.component.less']
})
export class ActionModalComponent implements OnInit {
  @Input() modal: BsModalRef;
  @Input() actionForm: FormGroup; 
  @Input() actionPlanId: number;
  @Input() observationId: number;
  @Input() schedule: ScheduleGet;
  isSaveInProgress: boolean = false;

  get isEditMode(){
    return this.actionPlanId != undefined;
  }
  
  constructor(private eSmatActionPlanService: EsmatActionPlanService, private translateService: TranslateService,
    private observationService: ObservationService, private toastrService: ToastrService, 
    public authorizationService: AuthorizationService) { }

  ngOnInit() {
  }

  onSavedClicked(){

    if(!this.actionPlanId && !this.observationId){
      this.modal.hide();
      return;
    }
    
    this.isSaveInProgress = true;    
    let model = Object.assign(new ActionViewModel(), <ActionViewModel>this.actionForm.value)
      .toActionPlanSave();

    model.location = Object.assign(new ScheduleGet(), this.schedule)
      .toLocationSave();
    
    let saveObservable: Observable<any>;
    
    if(this.actionPlanId){
      saveObservable = this.eSmatActionPlanService.update(this.actionPlanId, model)
        .pipe(
          mergeMap(() => this.translateService.get("eAction.SuccessfullyUpdated"))
        );
    }
    else if(this.observationId){
      model.sourceId = this.observationId;
      saveObservable = this.eSmatActionPlanService.create(model)
        .pipe(
          mergeMap((actionPlan:ActionPlanGet) => {
            this.actionPlanId = actionPlan.id;
            let model = new ObservationSave();
            model.actionPlanId = actionPlan.id;
            return this.observationService.update(this.observationId, model);
          }),         
          mergeMap(() => this.translateService.get("eAction.SuccessfullyCreated")));
    }
    
    saveObservable = saveObservable
      .pipe(
        mergeMap((message) => this.toastrService.success(message).onHidden)
      )
      .finally(() => this.isSaveInProgress = false);
      
    saveObservable.subscribe(() => this.modal.hide());
  }

  onCancelClicked(){    
    if(this.actionForm.invalid){
      (<FormGroup>this.actionForm.parent).removeControl('actionPlan');
    }
    this.modal.hide();
  }  
}