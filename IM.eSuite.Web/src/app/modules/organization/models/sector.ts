import { SelectItem } from "@im-angular/core";

export class Sector {    
    public id: number;
    public name: string;
    
    public static toSelectItem(sector: Sector): SelectItem {
        let result = new SelectItem();
        result.id = sector.id;
        result.text = sector.name;
        return result;
    }
}