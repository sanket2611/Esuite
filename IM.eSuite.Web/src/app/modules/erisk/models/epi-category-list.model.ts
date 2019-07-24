import { SelectItem } from "@im-angular/core";

export class EpiCategoryList
{
    public id: number;
    public description: string;

    public static toSelectItem(epiCategory: EpiCategoryList): SelectItem
    {
        var result = new SelectItem();
        result.id = epiCategory.id;
        result.text = epiCategory.description;
        return result;
    }
}