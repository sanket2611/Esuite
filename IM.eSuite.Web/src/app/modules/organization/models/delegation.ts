import { SelectItem } from "@im-angular/core";

export class Delegation {    
    public id: number;
    public name: string;
    
    public static toSelectItem(delegation: Delegation): SelectItem {
        let result = new SelectItem();
        result.id = delegation.id;
        result.text = delegation.name;
        return result;
    }
}