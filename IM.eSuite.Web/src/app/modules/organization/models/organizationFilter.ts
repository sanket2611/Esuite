import { OrganizationLevelType } from "./organizationLevelType";

export class OrganizationFilter {    
    public type: OrganizationLevelType;
    public id?: number;
    public name: string;

    constructor(type: OrganizationLevelType, id?: number, name?: string) {        
        this.type = type;
        this.id = id;
        this.name = name;
    }
}