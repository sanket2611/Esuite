import { SelectItem } from "@im-angular/core";

export class ObservationType {
    public id: number;
    public type: string;

    public static toSelectItem(observationClass: ObservationType): SelectItem {
        let result = new SelectItem();
        result.id = observationClass.id;
        result.text = observationClass.type;
        return result;
    }
}