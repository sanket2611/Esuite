import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { EriskRoutingModule } from './erisk-routing.module';
import { RiskRootComponent } from './components/risk-root/risk-root.component';
import { ConsolidationComponent } from './components/consolidation/consolidation.component';
import { RiskEvaluationComponent } from './components/risk-evaluation/risk-evaluation.component';
import { RiskInformationsFormComponent } from './components/risk-informations-form/risk-informations-form.component';
import { AccordionModule, TooltipModule } from 'ngx-bootstrap';
import { RiskSituationFormComponent } from './components/risk-situation-form/risk-situation-form.component';
import { RiskScoreComponent } from './components/risk-score/risk-score.component';
import { RiskControlFormComponent } from './components/risk-control-form/risk-control-form.component';
import { RiskMoreInformationsFormComponent } from './components/risk-more-informations-form/risk-more-informations-form.component';
import { RiskAddMeanOfControlModalComponent } from './components/risk-add-mean-of-control-modal/risk-add-mean-of-control-modal.component';
import { RiskActionModalComponent } from './components/risk-action-modal/risk-action-modal.component';
import { RiskDeleteComponent } from './components/risk-delete/risk-delete.component';
import { RiskService} from './services/risk-service';
import { HazardService } from './services/hazard.service';
import { ProbabilityService } from './services/probability.service';
import { RiskSourceService } from './services/risk-source.service';
import { EpiService } from './services/epi.service';
import { EpiCategoryService } from './services/epi-category.service';
import { RiskResolve } from './resolvers/risk.resolve';
import { PlantService } from '../organization/services/plant.service';
import { ConsolidationService } from './services/consolidation.service';
import { SafetySheetService } from './services/safety-sheet.service';
import { RiskSourcesResolve } from './resolvers/risk-sources.resolve';
import { StandardEvaluationFeedbacksResolve } from './resolvers/standard-evaluation-feedbacks.resolve';
import { ProbabilitiesResolve } from './resolvers/probabilities.resolve';
import { SeveritiesResolve } from './resolvers/severities.resolve';
import { FrequenciesResolve } from './resolvers/frequencies.resolve';
import { ReliabilitiesResolve } from './resolvers/reliabilities.resolve';
import { LanguageService } from './services/language.service';
import { MeanOfControlService } from './services/mean-of-control.service';
import { SeverityService } from './services/severity.service';
import { FrequencyService } from './services/frequency.service';
import { ReliabilityService } from './services/Reliability.service';
import { StandardEvaluationFeedbackService } from './services/standard-evaluation-feedback.service';
import { EriskActionPlanService } from './services/erisk-action-plan.service';
import { ConsolidationResolve } from './resolvers/consolidation.resolve';
import { RiskAssessmentComponent } from './components/risk-assessment/risk-assessment.component';
import { AssessmentResolve } from './resolvers/assessment.resolve';
import { RiskUpdateResolve } from './resolvers/risk.update.resolve';
import { ScoreService } from './services/score.service';
import { ChronicRiskScoresResolve } from './resolvers/chronic-risk-scores.resolve';
import { RisksCopyComponent } from './components/risks-copy/risks-copy.component';
import { RiskEvaluationDateComponent } from './components/risk-evaluation-date/risk-evaluation-date.component';
import { HazardPlantService } from './services/hazard-plant.service';
import { EpiPlantService } from './services/epi-plant-service';
import { RiskImportComponent } from './components/risk-import/risk-import.component';

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    AccordionModule.forRoot(),
    TooltipModule.forRoot(),
    EriskRoutingModule,
    AngularMultiSelectModule 
  ],
  declarations: [
    RiskRootComponent,
    ConsolidationComponent,
    RiskEvaluationComponent,
    RiskInformationsFormComponent,
    RiskSituationFormComponent,
    RiskScoreComponent,
    RiskControlFormComponent,
    RiskActionModalComponent,
    RiskMoreInformationsFormComponent,
    RiskAddMeanOfControlModalComponent,
    RiskAssessmentComponent,
    RiskDeleteComponent,
    RisksCopyComponent,
    RiskEvaluationDateComponent,
    RiskImportComponent,
  ],
  providers: [
    ConsolidationService,
    ConsolidationResolve,
    RiskService,
    RiskResolve,
    RiskUpdateResolve,
    PlantService,
    RiskSourcesResolve,
    StandardEvaluationFeedbacksResolve,
    HazardService,
    HazardPlantService,
    EpiService,
    EpiPlantService,
    EpiCategoryService,
    RiskSourceService,
    SeverityService,
    FrequencyService,
    ScoreService,
    ReliabilityService,
    StandardEvaluationFeedbackService,
    RiskSourceService,
    SafetySheetService,
    ProbabilityService,
    ProbabilitiesResolve,
    SeveritiesResolve,
    FrequenciesResolve,
    ChronicRiskScoresResolve,
    ReliabilitiesResolve,
    LanguageService,
    MeanOfControlService,
    EriskActionPlanService,
    AssessmentResolve,
    SafetySheetService
  ]
})
export class EriskModule { }
