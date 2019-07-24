import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationGuard } from '@im-angular/authentication';
import { RiskRootComponent } from './components/risk-root/risk-root.component';
import { ConsolidationComponent } from './components/consolidation/consolidation.component';
import { RiskEvaluationComponent } from './components/risk-evaluation/risk-evaluation.component';
import { PlantsResolve } from '../organization/resolvers/plants.resolve';
import { RiskSourcesResolve } from './resolvers/risk-sources.resolve';
import { StandardEvaluationFeedbacksResolve } from './resolvers/standard-evaluation-feedbacks.resolve';
import { SeveritiesResolve } from './resolvers/severities.resolve';
import { FrequenciesResolve } from './resolvers/frequencies.resolve';
import { ReliabilitiesResolve } from './resolvers/reliabilities.resolve';
import { ProbabilitiesResolve } from './resolvers/probabilities.resolve';
import { RiskAssessmentComponent } from './components/risk-assessment/risk-assessment.component';
import { AssessmentResolve } from './resolvers/assessment.resolve';
import { ConsolidationResolve } from './resolvers/consolidation.resolve';
import { RiskUpdateResolve } from './resolvers/risk.update.resolve';
import { ChronicRiskScoresResolve } from './resolvers/chronic-risk-scores.resolve';

const routes: Routes = [
  { path : '', component: RiskRootComponent, canActivate: [AuthenticationGuard], children: [
    { path : '', component: ConsolidationComponent, resolve: { plants: PlantsResolve, consolidation: ConsolidationResolve } },
    { path : 'evaluation', component: RiskEvaluationComponent, resolve: { plants: PlantsResolve, riskSources: RiskSourcesResolve,
      standardEvaluationFeedbacks: StandardEvaluationFeedbacksResolve,
      probabilities: ProbabilitiesResolve, severities: SeveritiesResolve, frequencies: FrequenciesResolve, chronicRiskScores:ChronicRiskScoresResolve,
      reliabilities: ReliabilitiesResolve } 
    },
    {
       path: 'evaluation/:id', component: RiskEvaluationComponent, resolve: {
         risk: RiskUpdateResolve, plants: PlantsResolve, riskSources: RiskSourcesResolve,
         standardEvaluationFeedbacks: StandardEvaluationFeedbacksResolve,
         probabilities: ProbabilitiesResolve, severities: SeveritiesResolve, frequencies: FrequenciesResolve, chronicRiskScores:ChronicRiskScoresResolve,
         reliabilities: ReliabilitiesResolve
       }
     },
    { path : 'assessment', component: RiskAssessmentComponent, resolve: {
      plants: PlantsResolve, assessment: AssessmentResolve} },
    { path : 'master-data', loadChildren: 'app/modules/erisk/modules/master-data/erisk-master-data.module#EriskMasterDataModule'},
    { path : 'reporting', loadChildren: 'app/modules/erisk/modules/reporting/erisk-reporting.module#EriskReportingModule'},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EriskRoutingModule { }