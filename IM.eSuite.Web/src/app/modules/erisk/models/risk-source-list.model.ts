
import { RiskSourceSelectItem } from "../viewModels/risk-source-select-item.viewModel";

export class RiskSourceList
{
    public id: number;
    public isOtherRiskSource: boolean;
    public hasStandardEvaluationFeedback: boolean;
    public description: string;

    public static toSelectItem(riskSource: RiskSourceList): RiskSourceSelectItem
    {
        var result = new RiskSourceSelectItem();
        result.id = riskSource.id;
        result.text = riskSource.description;
        result.isOtherRiskSource= riskSource.isOtherRiskSource; 
        result.hasStandardEvaluationFeedback= riskSource.hasStandardEvaluationFeedback; 
        return result;
    }
}