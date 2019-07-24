import { InformationViewModel } from "./information.viewModel";
import { RiskSave } from "../models/risk-save.model";
import { RiskGet } from "../models/risk-get.model";
import { ScoreViewModel } from "./score.viewModel";
import { RiskControlViewModel } from "./riskControl.viewModel";
import { SituationViewModel } from "./situation.viewModel";
import { ScoreGet } from "../models/score-get.model";
import { MoreInformationViewModel } from "./more-information.viewModel";
import { ActionViewModel } from "./action.viewModel";

export class RiskViewModel {
    //public id: number;
    public date: Date;
    public addedAt: Date;
    public informations: InformationViewModel;

    public situations: SituationViewModel

    public moreInformations: MoreInformationViewModel;

    public finalRisk: ScoreViewModel;
    public initialRisk: ScoreViewModel;

    public riskControl: RiskControlViewModel;

    public actionPlan: ActionViewModel;

    public static fromRiskGet(risk: RiskGet): RiskViewModel {
        let result = new RiskViewModel;
        if (risk) {
            //result.id = risk.id;

            //General information
            result.date = Object.assign(new Date(), risk.lastEvaluationDate);
            result.informations = InformationViewModel.fromRiskGet(risk);
            result.addedAt = Object.assign(new Date(), risk.addedAt);
            //Hazard 
            result.situations = SituationViewModel.fromRiskGet(risk);

            //Mean of Control
            result.riskControl = RiskControlViewModel.fromRiskGet(risk);

            //initial & final risk
            result.initialRisk = Object.assign(new ScoreGet(), risk.withoutMeansOfControlScore).toScoreViewModel();
            result.finalRisk = Object.assign(new ScoreGet(), risk.riskHistories[risk.riskHistories.length - 1].withMeansOfControlScore).toScoreViewModel();

            //more information
            result.moreInformations = MoreInformationViewModel.fromRiskGet(risk);
        }
        return result;
    }

    public toRiskSave(): RiskSave {
        let result = new RiskSave();

        //General information
        result.lastEvaluationDate = Object.assign(new Date(), this.date);
        result.location = InformationViewModel.toLocationSave(this.informations.location);
        result.jobDescription = this.informations.jobDescription;
        result.otherRiskSource = this.informations.otherRiskSource;
        result.standardEvaluationFeedbackIds = this.informations.standardEvaluationFeedbacks.map(sef => sef.id);
        result.riskSourceIds = this.informations.riskSources.map(rs => rs.id);
        result.minimumJobEpiIds = this.informations.epis.map(e => e.id);

        //Hazard
        result.hazardId = this.situations.hazardId;
        result.hazardDescription = this.situations.description;

        //Mean of Control
        result.technicalMesuresReliabilityId = this.riskControl.technicalMeasures.reliabilityId;
        result.technicalMesuresComment = this.riskControl.technicalMeasures.comment;
        result.organisationAndBehaviorReliabilityId = this.riskControl.organizations.reliabilityId;
        result.organisationAndBehaviorComment = this.riskControl.organizations.comment;
        result.specificEpisReliabilityId = this.riskControl.epis.reliabilityId;
        result.specificEpisComment = this.riskControl.epis.comment;;
        result.employeesCategories = this.riskControl.epis.employeeType;
        Array.prototype.push.apply(result.meanOfControlIds, this.riskControl.technicalMeasures.descriptions.map(d => d.id));
        Array.prototype.push.apply(result.meanOfControlIds, this.riskControl.organizations.descriptions.map(d => d.id));
        Array.prototype.push.apply(result.meanOfControlIds, this.riskControl.organizations.trainings.map(t => t.id));
        Array.prototype.push.apply(result.meanOfControlIds, this.riskControl.organizations.ruleControls.map(rc => rc.id));
        Array.prototype.push.apply(result.meanOfControlIds, this.riskControl.organizations.communicationAndInformations.map(cai => cai.id));
        Array.prototype.push.apply(result.meanOfControlIds, this.riskControl.organizations.others.map(o => o.id));
        result.specificTaskEpiIds = this.riskControl.epis.descriptions.map(d => d.id);

        //initial & final risk
        result.withMeansOfControlScore = Object.assign(new ScoreViewModel(), this.finalRisk).toScoreSave();
        result.withoutMeansOfControlScore = Object.assign(new ScoreViewModel(), this.initialRisk).toScoreSave();

        //more information
        result.moreInformationsFilePath = this.moreInformations.filePath;
        result.moreInformationsComment = this.moreInformations.comment;

        return result;
    }
}
