import { ScoreSave } from "../models/score-save.model";

export class ScoreViewModel {
    public probabilityId: number;
    public severityId: number;
    public frequencyId: number;
    public chronicRiskScoreId : number;
    public isChronicRiskScore : boolean;

    public toScoreSave(): ScoreSave {
        if((this.probabilityId && this.severityId) || this.chronicRiskScoreId)
        {
            let result = new ScoreSave();
            result.probabilityId = (this.probabilityId)?this.probabilityId:null;
            result.severityId = (this.severityId)?this.severityId:null;
            result.frequencyId = (this.frequencyId)?this.frequencyId:null;
            result.chronicRiskScoreId = (this.chronicRiskScoreId)?this.chronicRiskScoreId:null;
            return result;
        }
        return null;
    }
}