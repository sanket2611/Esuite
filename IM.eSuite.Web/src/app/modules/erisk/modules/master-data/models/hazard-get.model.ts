import { HazardDescriptionGet } from "./hazard-description-get.model";

export class HazardGet {
    public id: number;
    public plantId : number;
    public descriptions: HazardDescriptionGet[];
}