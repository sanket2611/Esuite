import { ObservationCategoryDescriptionSave } from "./observation-category-description-save.model";

export class ObservationCategorySave {
    public plantId: number;
    public observationTypeId: number;
    public descriptions: ObservationCategoryDescriptionSave[] = new Array<ObservationCategoryDescriptionSave>();
    public isStandard: boolean;
}
