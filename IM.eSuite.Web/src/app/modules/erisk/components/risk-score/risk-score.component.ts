import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RateSelectItem } from '../../viewModels/rate-select-item.viewModel';
import { ProbabilityList } from "../../models/probability-list.model";
import { SeverityList } from '../../models/severity-list.model';
import { FrequencyList } from '../../models/frequency-list';
import { ScoreViewModel } from '../../viewModels/score.viewModel';
import { ScoreService } from '../../services/score.service';
import { ChronicRiskScoreList } from '../../models/chronic-risk-score-list.model';
import { ScoreSelectItem } from '../../viewModels/score-select-item.viewModel';

@Component({
  selector: 'app-risk-score',
  templateUrl: './risk-score.component.html',
  styleUrls: ['./risk-score.component.less']
})
export class RiskScoreComponent implements OnInit {
  @Input() parentForm: FormGroup;
  @Input() controlName: string;
  @Input() hasRequiredFields: boolean;
  @Input() scoreModel: ScoreViewModel;
  scoreForm: FormGroup;
  probabilities: RateSelectItem[];
  severities: RateSelectItem[];
  frequencies: RateSelectItem[];
  chronicRiskScores: ScoreSelectItem[];
  isChronicRiskScore: boolean;
  score: number;
  backgroundClass: string;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private scoreService: ScoreService) { }

  ngOnInit() {
    this.scoreForm = this.formBuilder.group({
      isChronicRiskScore: [],
      probabilityId: [null, this.hasRequiredFields && !this.isChronicRiskScore ? Validators.required : Validators.nullValidator],
      severityId: [null, this.hasRequiredFields && !this.isChronicRiskScore ? Validators.required : Validators.nullValidator],
      frequencyId: [],
      chronicRiskScoreId: [null, this.hasRequiredFields && this.isChronicRiskScore ? Validators.required : Validators.nullValidator]
    });

    this.parentForm.addControl(this.controlName, this.scoreForm);

    let probabilities = this.route.snapshot.data["probabilities"];
    if (probabilities) {
      this.probabilities = probabilities.map(ProbabilityList.toRateSelectItem);
    }

    let severities = this.route.snapshot.data["severities"];
    if (severities) {
      this.severities = severities.map(SeverityList.toSelectItem);
    }


    let frequencies = this.route.snapshot.data["frequencies"];
    if (frequencies) {
      this.frequencies = frequencies.map(FrequencyList.toSelectItem);
    }

    let chronicRiskScores = this.route.snapshot.data["chronicRiskScores"];
    if (chronicRiskScores) {
      this.chronicRiskScores = chronicRiskScores.map(ChronicRiskScoreList.toSelectItem);
    }

    if (this.scoreModel) {
      let model = this.scoreModel;
      this.isChronicRiskScore = model.isChronicRiskScore;      
      this.scoreForm.patchValue(model);
      this.onChronicRiskScoreChanged(false);
    }

    this.computeScore();
  }

  onProbabilitySelected() {
    this.computeScore();
  }

  onProbabilityRemoved() {
    this.computeScore();
  }

  onSeveritySelected() {
    this.computeScore();
  }

  onSeverityRemoved() {
    this.computeScore();
  }

  onFrequencySelected() {
    this.computeScore();
  }

  onFrequencyRemoved() {
    this.computeScore();
  }

  onChronicRiskScoreSelected() {
    this.computeScore();
  }

  onChronicRiskScoreRemoved() {
    this.computeScore();
  }

  onChronicRiskScoreChanged(resetFields: boolean = true) {
    this.isChronicRiskScore = this.scoreForm.controls.isChronicRiskScore.value;

    this.scoreForm.controls.probabilityId.disable();        
    this.scoreForm.controls.severityId.disable();
    this.scoreForm.controls.frequencyId.disable();

    if(!this.isChronicRiskScore) {
      this.scoreForm.controls.probabilityId.enable();
      this.scoreForm.controls.severityId.enable();
      this.scoreForm.controls.frequencyId.enable();
    }

    if (this.isChronicRiskScore && this.hasRequiredFields) {
        this.scoreForm.controls.probabilityId.validator = Validators.nullValidator;        
        this.scoreForm.controls.severityId.validator = Validators.nullValidator;
        this.scoreForm.controls.chronicRiskScoreId.validator = Validators.required;        
    }
    else if (this.hasRequiredFields) {
        this.scoreForm.controls.probabilityId.validator = Validators.required;
        this.scoreForm.controls.severityId.validator = Validators.required;
        this.scoreForm.controls.chronicRiskScoreId.validator = Validators.nullValidator;        
    }

    if(resetFields){
      this.scoreForm.controls.probabilityId.setValue(undefined);
      this.scoreForm.controls.severityId.setValue(undefined);
      this.scoreForm.controls.frequencyId.setValue(undefined);
      this.scoreForm.controls.chronicRiskScoreId.setValue(undefined);
    }

    this.computeScore();
  }

  private computeScore() {

    var probabilityRate = 1;
    var probabilityId = this.scoreForm.controls.probabilityId.value;
    if (probabilityId) {
      probabilityRate = this.probabilities.find(p => p.id == probabilityId).rate;
    }

    var severityRate = 1;
    var severityId = this.scoreForm.controls.severityId.value;
    if (severityId) {
      severityRate = this.severities.find(s => s.id == severityId).rate;
    }

    var frequencyRate = 1;
    var frequencyId = this.scoreForm.controls.frequencyId.value;
    if (frequencyId) {
      frequencyRate = this.frequencies.find(s => s.id == frequencyId).rate;
    }

    let chronicRiskScoreId = this.scoreForm.controls.chronicRiskScoreId.value;
    if (chronicRiskScoreId) {
      this.score = this.chronicRiskScores.find(crs => crs.id == chronicRiskScoreId).score;
    }
    else {
      this.score = this.scoreService.computeScore(probabilityRate, severityRate, frequencyRate);
    }
    this.setBackgroundColor();
  }

  private setBackgroundColor() {
    if (this.score <= 20) {
      this.backgroundClass = "bg-green";
    }
    else if (this.score > 20 && this.score < 200) {
      this.backgroundClass = "bg-yellow";
    }
    else {
      this.backgroundClass = "bg-red";
    }
  }
}