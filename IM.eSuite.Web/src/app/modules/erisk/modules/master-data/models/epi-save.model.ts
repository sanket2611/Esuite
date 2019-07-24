import { EpiDescriptionSave } from "./epi-description-save.model";

export class EpiSave {
    public id: number;
    public plantId : number;
    public epiCategoryId: number;
    public descriptions: EpiDescriptionSave[];
}