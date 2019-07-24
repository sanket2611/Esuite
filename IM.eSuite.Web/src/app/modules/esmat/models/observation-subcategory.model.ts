import { SelectItem } from "@im-angular/core";
import { Plant } from "../../organization/models/plant";

export class ObservationSubCategory {
    public id: number;
    public name: string;
    public active: boolean;
    public observationCategoryId: number;

    public static toSelectItem(observationSubCategory: ObservationSubCategory): SelectItem {
        let result = new SelectItem();
        result.id = observationSubCategory.id;
        result.text = observationSubCategory.name;
        return result;
    }
}