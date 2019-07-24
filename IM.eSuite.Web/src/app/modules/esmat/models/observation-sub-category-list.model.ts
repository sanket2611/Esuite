import { SelectItem } from "@im-angular/core";

export class ObservationSubCategoryList {
    public id: number;
    public description: string;
    public isActive: boolean;
    public isStandard: boolean;

    public static toSelectItem(observationSubCategory: ObservationSubCategoryList): SelectItem {
        let result = new SelectItem();
        result.id = observationSubCategory.id;
        result.text = observationSubCategory.description;
        return result;
    }
}