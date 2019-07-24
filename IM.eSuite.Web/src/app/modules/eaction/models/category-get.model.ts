import { SelectItem } from "@im-angular/core";

export class CategoryGet {
    public id: number;
    public description: string;

    public static toSelectItem(category: CategoryGet): SelectItem {
        let result = new SelectItem();
        result.id = category.id;
        result.text = category.description;
        return result;
    }
}