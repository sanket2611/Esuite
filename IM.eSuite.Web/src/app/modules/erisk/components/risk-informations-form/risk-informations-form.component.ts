import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SelectItem, PagedList } from '@im-angular/core';
import { InformationViewModel } from '../../viewModels/information.viewModel';
import { RiskSourceSelectItem } from '../../viewModels/risk-source-select-item.viewModel';
import { EpiSelectItem } from '../../viewModels/epi-select-item.viewModel';
import { LocationGet } from '../../../eaction/models/location-get.model';
import { RiskSourceList } from '../../models/risk-source-list.model';
import { EpiList } from '../../models/epi-list.model';
import { StandardEvaluationFeedbackList } from '../../models/standard-evaluation-feedback-list.model';
import { EpiService } from '../../services/epi.service';
import { EpiListRequest } from '../../models/epi-list-request.model';

@Component({
  selector: 'app-risk-informations-form',
  templateUrl: './risk-informations-form.component.html'

})
export class RiskInformationsFormComponent implements OnInit {
  today = Date.now();
  riskSources: Array<RiskSourceSelectItem> = new Array<RiskSourceSelectItem>();
  riskSourcesSettings: any;
  standardEvaluationFeedbacks: Array<SelectItem> = new Array<SelectItem>();
  standardEvaluationFeedBacksSettings: any;
  epis: Array<EpiSelectItem> = new Array<EpiSelectItem>();
  episSettings: any;
  modificationsTable = [];
  @Input() parentForm: FormGroup;
  @Input() informations: InformationViewModel;
  @Input() isEditMode: Boolean;
  @Output() onPlantChangedRequest: EventEmitter<number> = new EventEmitter<number>();
  informationForm: FormGroup;
  plantId: number;
  location: LocationGet;
  creationDate: Date = new Date();

  get model() { return <InformationViewModel>this.informationForm.value };

  get displayStandardEvaluationFeedback(): boolean {
    var riskSources: RiskSourceSelectItem[] = this.informationForm.controls.riskSources.value;
    var isDisplayed = riskSources.some(rs => rs.hasStandardEvaluationFeedback);

    if (isDisplayed) {
      this.informationForm.controls.standardEvaluationFeedbacks.validator = Validators.required;
    }

    return isDisplayed;
  }

  get displayOtherRiskSource(): boolean {
    var riskSources: RiskSourceSelectItem[] = this.informationForm.controls.riskSources.value;
    var isDisplayed = riskSources.some(rs => rs.isOtherRiskSource);

    if (isDisplayed) {
      this.informationForm.controls.otherRiskSource.validator = Validators.required;
    }

    return isDisplayed;
  }

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private translateService: TranslateService, private epiService: EpiService) {
  }

  ngOnInit() {

    this.informationForm = this.formBuilder.group({
      jobDescription: [null],
      riskSources: [[]],
      otherRiskSource: [null],
      standardEvaluationFeedbacks: [[]],
      epis: [[]],
    });

    this.parentForm.addControl('informations', this.informationForm);

    var riskSources = <RiskSourceList[]>this.route.snapshot.data['riskSources'];
    if (riskSources) {
      this.riskSources = riskSources.map(rs => RiskSourceList.toSelectItem(rs));
    }

    var standardEvaluationFeedbacks = <StandardEvaluationFeedbackList[]>this.route.snapshot.data['standardEvaluationFeedbacks'];
    if (standardEvaluationFeedbacks) {
      this.standardEvaluationFeedbacks = standardEvaluationFeedbacks.map(sef => StandardEvaluationFeedbackList.toSelectItem(sef));
    }


    this.riskSourcesSettings = this.getMultiSelectSettings();
    this.translateService.get("eRisk.RiskForm.RiskSource").subscribe(t => this.riskSourcesSettings.text = t);

    this.standardEvaluationFeedBacksSettings = this.getMultiSelectSettings();
    this.translateService.get("eRisk.RiskForm.StandardEvaluationFeedback").subscribe(t => this.standardEvaluationFeedBacksSettings.text = t);

    this.episSettings = this.getMultiSelectSettings();
    this.translateService.get("eRisk.RiskForm.EPI").subscribe(t => this.episSettings.text = t);
    this.episSettings.groupBy = "category";


    if (this.informations) {
      this.creationDate = this.informations.addedAt;
      let model = this.informations;
      this.location = InformationViewModel.toLocationGet(model.location);
      this.modificationsTable = model.riskHistories.reverse();
      model.riskSources = this.riskSources.filter(rs => model.riskSources.some(m_rs => m_rs.id == rs.id));
      model.standardEvaluationFeedbacks = this.standardEvaluationFeedbacks.filter(sef => model.standardEvaluationFeedbacks.some(m_sef => m_sef.id == sef.id));
      this.informationForm.patchValue(model);
    }

  }

  onPlantChanged(plantId: number) {
    this.onPlantChangedRequest.emit(plantId);
    this.initEpis(plantId);
  }

  private initEpis(plantId: number) {

    var request = new EpiListRequest();
    request.pageNumber = 1;
    request.pageSize = 50;
    request.sortBy = "description";
    request.onlyActiveForPlant = true;
    request.plantId = plantId;
    this.epiService.list(request).subscribe
      (
        data => {
          let episList: PagedList<EpiList> = data;
          this.epis = episList.entries.map(EpiList.toEpiSelectItem);
          let model = this.informations;
          if (this.informations) {
            model.epis = this.epis.filter(epi => model.epis.some(m_epi => m_epi.id == epi.id));
            this.informationForm.controls.epis.patchValue(model.epis);
          }
        }
      );
  }

  private getMultiSelectSettings(): any {
    var settings: any = {
      singleSelection: false,
      enableSearchFilter: true,
      badgeShowLimit: 5,
      labelKey: "text",
      classes: "dropdown-multi-select"
    };

    this.translateService.get("Common.Forms.SelectAll").subscribe(t => settings.selectAllText = t);
    this.translateService.get("Common.Forms.UnSelectAll").subscribe(t => settings.unSelectAllText = t);

    return settings;
  }
}