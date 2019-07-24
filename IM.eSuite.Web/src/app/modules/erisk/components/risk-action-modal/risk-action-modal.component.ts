import { Component, OnInit, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AuthorizationService } from '@im-angular/authentication';
import { ActionViewModel } from '../../viewModels/action.viewModel';

@Component({
  selector: 'app-risk-action-modal',
  templateUrl: './risk-action-modal.component.html',
  styleUrls: ['./risk-action-modal.component.less']
})
export class RiskActionModalComponent implements OnInit {
  @Input() actionForm: FormGroup;
  @Input() modal: BsModalRef;
  @Input() plantId: number;
  @Input() isEditMode : Boolean;
  @Input() actionPlan : ActionViewModel;
  isSaveInProgress: boolean = false;

  constructor( public authorizationService: AuthorizationService,
    private formBuilder: FormBuilder) {
  }

  ngOnInit() {
  }

  onSavedClicked() {
    this.modal.hide();
  }

  onCancelClicked() {
    if (this.actionForm.invalid) {
      (<FormGroup>this.actionForm.parent).removeControl('actionPlan');
    }

    this.modal.hide();
  }
}
