import { HazardDescriptionSave } from "./hazard-description-save.model";

export class HazardSave {
    public plantId : number;
    public id: number;
    public parentId: number;
    public descriptions: HazardDescriptionSave[];
}