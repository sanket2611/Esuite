import { SelectItem } from "@im-angular/core";
import { ObservationTypeEnum } from "../enums/observation-type.enum";

export class ObservationCategoryList {
    public id: number;
    public categoryTypeId: ObservationTypeEnum;
    public categoryType: string;
    public isStandard: boolean;
    public description: string;
    public subCategoryCount: number;

    public static toSelectItem(observationCategory: ObservationCategoryList): SelectItem {
        let result = new SelectItem();
        result.id = observationCategory.id;
        result.text = observationCategory.description;
        return result;
    }
}