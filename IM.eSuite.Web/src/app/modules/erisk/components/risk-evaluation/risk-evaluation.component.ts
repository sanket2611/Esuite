import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { ModalDirective } from "ngx-bootstrap/modal";
import { AuthorizationService } from "@im-angular/authentication";
import { RiskEvaluationService } from "./risk-evaluation-service";
import { RiskGet } from "../../models/risk-get.model";
import { StatusEnum } from "../../../eaction/enums/status.enum";
import { RiskViewModel } from "../../viewModels/risk.viewModel";
import { InformationViewModel } from "../../viewModels/information.viewModel";
import { SituationViewModel } from "../../viewModels/situation.viewModel";
import { ScoreViewModel } from "../../viewModels/score.viewModel";
import { RiskControlViewModel } from "../../viewModels/riskControl.viewModel";
import { MoreInformationViewModel } from "../../viewModels/more-information.viewModel";
import { ActionPlanGet } from "../../../eaction/models/action-plan-get.model";
import { ActionViewModel } from "../../viewModels/action.viewModel";
import { EriskActionPlanService } from "../../services/erisk-action-plan.service";
import { SelectItem, SortViewModel } from "@im-angular/core";
import { HazardService } from "../../services/hazard.service";


@Component({
  selector: 'app-risk-evaluation',
  templateUrl: './risk-evaluation.component.html',
  styleUrls: ['./risk-evaluation.component.less'],
  providers: [RiskEvaluationService]
})
export class RiskEvaluationComponent implements OnInit {
  riskForm: FormGroup;
  actionForm: FormGroup;
  plantId: number;
  actionPlanId: number;
  actionPlanVM: ActionViewModel;
  informationVM: InformationViewModel;
  situationsVM: SituationViewModel;
  initialRiskVM: ScoreViewModel;
  finalRiskVM: ScoreViewModel
  riskControlVM: RiskControlViewModel;
  moreInformationVM: MoreInformationViewModel;
  file: File;
  isSaveInProgress: boolean;
  StatusEnum = StatusEnum;
  @ViewChild('actionModal') actionModal: ModalDirective;


  private id: number;

  get informations() { return <FormGroup>this.riskForm.controls.informations; }
  get isEditMode() {
    return this.route.snapshot.paramMap.has('id');
  }

  constructor(private route: ActivatedRoute,
    public authorizationService: AuthorizationService,
    private formBuilder: FormBuilder,
    private riskEvaluationService: RiskEvaluationService,
    private eRiskActionPlanService: EriskActionPlanService,
    private hazardService: HazardService) {
  }

  ngOnInit() {
    this.initFormGroup();

    let risk: RiskGet = this.route.snapshot.data['risk'];

    if (risk) {
      this.id = +this.route.snapshot.paramMap.get('id');
      let riskViewModel = RiskViewModel.fromRiskGet(risk);

      if (risk.actionPlanId) {
        this.eRiskActionPlanService.get(risk.actionPlanId).subscribe(actionPlan => {
          this.actionPlanId = actionPlan.id;
          riskViewModel.actionPlan = ActionViewModel.getFromActionPlanGet(actionPlan);
          this.actionPlanVM = riskViewModel.actionPlan;
        });
      }

      this.informationVM = riskViewModel.informations;
      this.plantId = riskViewModel.informations.location.plantId;
      this.situationsVM = riskViewModel.situations;
      this.initialRiskVM = riskViewModel.initialRisk;
      this.finalRiskVM = riskViewModel.finalRisk;
      this.riskControlVM = riskViewModel.riskControl;
      this.moreInformationVM = riskViewModel.moreInformations;
    }
  }

  onPlantChanged(plantId: number) {
    this.plantId = plantId;
  }

  onSubmit() {
    this.isSaveInProgress = true;
    this.riskEvaluationService.saveRisk(this.id, this.actionPlanId, this.riskForm.value, this.file)
      .finally(() => this.isSaveInProgress = false)
      .subscribe();
  }

  onAddActionClicked() {
    if (!this.riskForm.contains('actionPlan')) {
      this.actionForm = this.formBuilder.group({
        responsible: [null],
        responsibleFirstName: [null],
        responsibleLastName: [null],
        status: [StatusEnum[StatusEnum.Opened]],
        description: [null],
        actionTaken: [null],
        dueDate: [null, Validators.nullValidator],
        initialDueDate: [null, Validators.required],
        completionDate: [],
        closingDate: [],
        comment: [],
        feedbackEmails: []
      });
      this.riskForm.addControl("actionPlan", this.actionForm)

      if (this.actionPlanVM) {
        let model = this.actionPlanVM;
        this.actionForm.patchValue(model);
        //this.feedbackEmails = model.feedbackEmails.map(email => Object.assign(new SelectItem(), { text: email }));
      }
    }

    this.actionModal.show();
  }

  onDownloadFileClicked() {
    this.riskEvaluationService.downloadFile(this.id);
  }

  private initFormGroup() {
    this.riskForm = this.formBuilder.group({
      date: [new Date(), Validators.required],
    });
  }

 
}