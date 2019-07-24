
import { SelectItem } from "@im-angular/core";

export class ReliabilityList
{
    public id: number;
    public description: string;

    public static toSelectItem(reliability: ReliabilityList): SelectItem
    {
        var result = new SelectItem();
        result.id = reliability.id;
        result.text = reliability.description;
        return result;
    }
}