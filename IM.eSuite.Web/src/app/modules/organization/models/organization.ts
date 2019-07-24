import { SelectItem } from "@im-angular/core";
import { Plant } from "./plant";

export class Organization {    
    public id: number;
    public name: string;    
    public parentId: number;
    public parent: Organization;
    public plantId: number;
    public plant: Plant;

    constructor(organization?: Organization){
        if(organization){
            this.id = organization.id;
            this.name = organization.name;
            this.parentId = organization.parentId;
            this.plantId = organization.plantId;            
        }
    }
    
    public static toSelectItem(organization: Organization): SelectItem {
        let result = new SelectItem();
        result.id = organization.id;
        result.text = organization.name;
        return result;
    }
}