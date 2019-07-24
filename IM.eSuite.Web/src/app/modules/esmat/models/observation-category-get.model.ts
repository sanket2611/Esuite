import { ObservationCategoryDescriptionGet } from "./observation-category-description-get.model";
import { ObservationCategoryViewModel } from "../viewModels/observation-category.viewModel";
import { LanguageDescriptionViewModel } from "../../shared/viewModels/language-description.viewModel";
import { Plant } from "../../organization/models/plant";

export class ObservationCategoryGet {
    public observationTypeId: number;
    public plant: Plant;
    public descriptions: ObservationCategoryDescriptionGet[];
    public isStandard: boolean;

    public static toObservationCategoryViewModel(observationCategoryGet: ObservationCategoryGet) : ObservationCategoryViewModel {
        let result = new ObservationCategoryViewModel();
        result.observationTypeId = observationCategoryGet.observationTypeId;
        result.descriptions = observationCategoryGet.descriptions.map(desc => {
            let d = new LanguageDescriptionViewModel();
            d.id = desc.id;
            d.language = desc.language;
            d.languageId = desc.languageId;
            d.value = desc.value;
            return d;
        });
        result.isStandard = observationCategoryGet.isStandard;
        return result;
    }
}