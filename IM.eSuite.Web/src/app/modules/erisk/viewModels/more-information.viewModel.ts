import { RiskGet } from "../models/risk-get.model";

export class MoreInformationViewModel {
    public comment: string;
    public filePath: string;

    public static fromRiskGet(risk: RiskGet): MoreInformationViewModel {
        let result = new MoreInformationViewModel();
        result.comment = risk.moreInformationsComment;
        result.filePath = risk.moreInformationsFilePath
        return result;
    }
}
