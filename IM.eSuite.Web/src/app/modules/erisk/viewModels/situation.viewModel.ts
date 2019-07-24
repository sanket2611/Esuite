import { RiskGet } from "../models/risk-get.model";

export class SituationViewModel {
    public hazardId: number;
    public description: string;

    public static fromRiskGet(risk: RiskGet): SituationViewModel {
        let result = new SituationViewModel();
        result.description = risk.riskHistories[risk.riskHistories.length - 1].hazardDescription
        result.hazardId = risk.hazardId;
        return result;
    }
}
