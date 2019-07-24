import { SelectItem } from "@im-angular/core";

export class HazardList
{
    public id: number;
    public description: string;
    public isEnabled : boolean;
    public isStandard : boolean;

    public static toSelectItem(hazard: HazardList): SelectItem
    {
        var result = new SelectItem();
        result.id = hazard.id;
        result.text = hazard.description;
        return result;
    }
}