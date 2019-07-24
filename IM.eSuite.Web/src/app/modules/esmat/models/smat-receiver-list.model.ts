import { SelectItem } from "@im-angular/core";

export class SmatReceiverList {
    public id: number;
    public name: string;
    public type: string;
    public plantName: string;

    public static toSelectItem(smatReceiver: SmatReceiverList): SelectItem
    {
        let result = new SelectItem();
        result.id = smatReceiver.id;
        result.text = smatReceiver.name;
        return result;
    }
}