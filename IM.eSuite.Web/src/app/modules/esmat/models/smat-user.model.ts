import { SelectItem } from "@im-angular/core";

export class SmatUser {
    public id: number;
    public firstName: string;
    public lastName: string;

    public static toSelectItem(smatUser: SmatUser): SelectItem {
        let result = new SelectItem();
        result.id = smatUser.id;
        result.text = `${smatUser.firstName} ${smatUser.lastName}`;
        return result;
    }
}

