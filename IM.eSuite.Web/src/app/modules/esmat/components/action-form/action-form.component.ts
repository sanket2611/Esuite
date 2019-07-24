import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SelectItem } from '@im-angular/core';
import { AuthorizationService } from '@im-angular/authentication';
import { ActionFormService } from './action-form.service';
import { StatusEnum } from '../../../eaction/enums/status.enum';
import { ObservationSummary } from '../../models/observation-summary';
import { ActionViewModel } from '../../viewModels/action.viewModel';
import { ResponsibleSelectItem } from '../../../shared/models/responsible-select-item.model';
import { ActionPlanGet } from '../../../eaction/models/action-plan-get.model';

@Component({
  selector: 'app-action-form',
  templateUrl: './action-form.component.html',
  styleUrls: ['./action-form.component.less'],
  providers : [ActionFormService]
})
export class ActionFormComponent implements OnInit {
  isSaveInProgress: boolean;
  observation: ObservationSummary;
  observationId: number;
  id: number;
  actionForm: FormGroup;
  action: ActionViewModel;  
  statuses: Array<string>;
  responsibles: Array<ResponsibleSelectItem>;
  feedbackEmails: Array<SelectItem>;  
  StatusEnum = StatusEnum;

  get isEditMode(): boolean {    
    return this.route.snapshot.paramMap.has('id');
  }

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private actionFormService: ActionFormService,   
    public authorizationService: AuthorizationService) {
  }

  ngOnInit() {
    this.observationId = +this.route.snapshot.paramMap.get('observationId');
    this.id = +this.route.snapshot.paramMap.get('id');
    this.observation = this.route.snapshot.data['observation'];

    this.actionForm = this.formBuilder.group({
      responsible: [null, Validators.required],
      responsibleFirstName: [null, Validators.required],
      responsibleLastName: [null, Validators.required],
      status: [StatusEnum[StatusEnum.Opened], Validators.required],
      description: [null, Validators.required],
      actionTaken: [null, Validators.required],
      initialDueDate: [null, Validators.required],
      dueDate: [null, Validators.nullValidator],
      completionDate: [],
      closingDate: [],
      comment: [],
      feedbackEmails: []
    });

    let action = <ActionPlanGet>this.route.snapshot.data['action'];
    if(action){      
      this.actionForm.setValue(ActionViewModel.getFromActionPlanGet(action));
      this.feedbackEmails = action.feedbackEmails.map(email => {
        let e = new SelectItem();
        e.text = email;
        return e;
      });
    }
  }  

  onSubmit() {
    this.isSaveInProgress = true;
    this.actionFormService.save(this.id, this.actionForm.value, this.observationId, 
      this.observation.schedule)
      .finally(() => this.isSaveInProgress = false)
      .subscribe();
  }
}