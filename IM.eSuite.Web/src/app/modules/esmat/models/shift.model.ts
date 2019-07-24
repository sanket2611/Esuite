import { SelectItem } from "@im-angular/core";

export class Shift {
    public id: number;
    public name: string;

    public static toSelectItem(shift: Shift): SelectItem {
        let result = new SelectItem();
        result.id = shift.id;
        result.text = shift.name;
        return result;
    }
}