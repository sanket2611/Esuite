import { SelectItem } from "@im-angular/core";
import { Delegation } from "./delegation";

export class Country {    
    public id: number;
    public name: string;    
    public delegationId: number;
    public delegation: Delegation;    
    
    public static toSelectItem(country: Country): SelectItem {
        let result = new SelectItem();
        result.id = country.id;
        result.text = country.name;
        return result;
    }
}