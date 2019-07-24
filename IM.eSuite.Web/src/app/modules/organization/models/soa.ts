import { SelectItem } from "@im-angular/core";
import { BusinessUnit } from "./businessUnit";

export class SOA {    
    public id: number;
    public name: string;    
    public businessUnitId: number;
    public businessUnit: BusinessUnit;

    constructor(){
        this.businessUnit = new BusinessUnit();
    }
    
    public static toSelectItem(soa: SOA): SelectItem {
        let result = new SelectItem();
        result.id = soa.id;
        result.text = soa.name;
        return result;
    }
}