
import { SelectItem } from "@im-angular/core";

export class StandardEvaluationFeedbackList
{
    public id: number;
    public description: string;

    public static toSelectItem(standardEvaluationFeedback: StandardEvaluationFeedbackList): SelectItem
    {
        var result = new SelectItem();
        result.id = standardEvaluationFeedback.id;
        result.text = standardEvaluationFeedback.description;
        return result;
    }
}