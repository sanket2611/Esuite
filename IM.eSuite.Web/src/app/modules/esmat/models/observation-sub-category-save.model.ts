import { ObservationSubCategoryDescriptionSave } from "./observation-sub-category-description-save.model"

export class ObservationSubCategorySave {    
    public observationCategoryId: number;
    public isActive: boolean;
    public plantId: number;
    public descriptions: ObservationSubCategoryDescriptionSave[];    
}