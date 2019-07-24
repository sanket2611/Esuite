import { SelectItem } from "@im-angular/core";

export class SubCategoryGet {
    public id: number;
    public description: string;

    public static toSelectItem(subcategory: SubCategoryGet): SelectItem {
        let result = new SelectItem();
        result.id = subcategory.id;
        result.text = subcategory.description;
        return result;
    }
}