import { ObservationCategoryDescriptionGet } from "./observation-category-description-get.model";
import { LanguageDescriptionViewModel } from "../../shared/viewModels/language-description.viewModel";
import { ObservationSubCategoryViewModel } from "../viewModels/observation-subCategory.viewModel";
import { Plant } from "../../organization/models/plant";

export class ObservationSubCategoryGet {    
    public category: string;
    public plantId: number;
    public isActive: boolean;
    public plant: Plant;
    public descriptions: ObservationCategoryDescriptionGet[];

    public static toObservationSubCategoryViewModel(observationSubCategoryGet: ObservationSubCategoryGet) : ObservationSubCategoryViewModel {
        let result = new ObservationSubCategoryViewModel();        
        result.isActive = observationSubCategoryGet.isActive;
        result.category = observationSubCategoryGet.category;
        result.plantId = observationSubCategoryGet.plantId;
        result.plant = observationSubCategoryGet.plant;
        result.descriptions = observationSubCategoryGet.descriptions.map(desc => {
            let d = new LanguageDescriptionViewModel();
            d.id = desc.id;
            d.language = desc.language;
            d.languageId = desc.languageId;
            d.value = desc.value;
            return d;
        });
        return result;
    }
}