import { LanguageDescriptionViewModel } from "../../shared/viewModels/language-description.viewModel";
import { ObservationSubCategorySave } from "../models/observation-sub-category-save.model";
import { ObservationSubCategoryDescriptionSave } from "../models/observation-sub-category-description-save.model";
import { ObservationSubCategoryPlantSave } from "../models/observation-sub-category-plant-save.model";
import { Plant } from "../../organization/models/plant";

export class ObservationSubCategoryViewModel {    
    public observationCategoryId: number;
    public category: string;
    public plantId: number;    
    public isActive: boolean = true;
    public plant: Plant;
    public descriptions: LanguageDescriptionViewModel[] = new Array<LanguageDescriptionViewModel>();

    toObservationSubCategorySave(): ObservationSubCategorySave {
        let result = new ObservationSubCategorySave();        
        result.observationCategoryId = this.observationCategoryId;
        result.plantId = this.plantId;
        result.isActive = this.isActive;
        result.descriptions = this.descriptions.map(desc => {
            let d = new ObservationSubCategoryDescriptionSave();
            d.id = desc.id;
            d.languageId = desc.languageId;
            d.value = desc.value;
            return d;
        });
        
        return result;
    }
}