import { SelectItem } from "@im-angular/core";
import { Sector } from "./sector";

export class BusinessUnit {    
    public id: number;
    public name: string;    
    public sectorId: number;
    public sector: Sector;    
    
    public static toSelectItem(businessUnit: BusinessUnit): SelectItem {
        let result = new SelectItem();
        result.id = businessUnit.id;
        result.text = businessUnit.name;
        return result;
    }
}