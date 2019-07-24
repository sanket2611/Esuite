import { ScoreViewModel } from "../viewModels/score.viewModel";
import { ProbabilityGet } from "./probability-get.model";
import { SeverityGet } from "./severity-get.model";
import { FrequencyGet } from "./frequency-get.model";
import { ChronicRiskScoreGet } from "./chronic-risk-score-get.model";

export class ScoreGet {    
    public probabilityId: number;
    public severityId: number;
    public frequencyId: number;
    public chronicRiskScoreId : number;

    public probability: ProbabilityGet;
    public severity: SeverityGet;
    public frequency: FrequencyGet;
    public chronicRiskScore : ChronicRiskScoreGet

    public toScoreViewModel() : ScoreViewModel
    {
        let result = new ScoreViewModel;
        result.severityId = this.severityId;
        result.probabilityId = this.probabilityId;
        result.frequencyId = this.frequencyId;
        result.chronicRiskScoreId = this.chronicRiskScoreId;
        result.isChronicRiskScore = (this.chronicRiskScoreId)?true:false;
        return result;
    }
}