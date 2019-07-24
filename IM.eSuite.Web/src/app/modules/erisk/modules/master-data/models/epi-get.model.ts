import { EpiDescriptionGet } from "./epi-description-get.model";

export class EpiGet {
    public id: number;
    public plantId : number;
    public epiCategory : string;
    public epiCategoryId: number;
    public descriptions: EpiDescriptionGet[];
}