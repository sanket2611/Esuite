import { SelectItem } from "@im-angular/core";

export class EmployeeType {
    public id: number;
    public type: string;

    public static toSelectItem(employeeType: EmployeeType): SelectItem {
        let result = new SelectItem();
        result.id = employeeType.id;
        result.text = employeeType.type;
        return result;
    }
}