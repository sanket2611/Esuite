import { LanguageDescriptionViewModel } from "../../shared/viewModels/language-description.viewModel";
import { ObservationCategorySave } from "../models/observation-category-save.model";
import { ObservationCategoryDescriptionSave } from "../models/observation-category-description-save.model";

export class ObservationCategoryViewModel {
    public plantId: number;
    public observationTypeId: number;
    public descriptions: LanguageDescriptionViewModel[] = new Array<LanguageDescriptionViewModel>();
    public isStandard: boolean;

    toObservationCategorySave(): ObservationCategorySave {
        let result = new ObservationCategorySave();
        result.plantId = this.plantId;
        result.observationTypeId = this.observationTypeId;
        result.descriptions = this.descriptions.map(desc => {
            let d = new ObservationCategoryDescriptionSave();
            d.id = desc.id;
            d.languageId = desc.languageId;
            d.value = desc.value;
            return d;
        });
        result.isStandard = this.isStandard;
        return result;
    }
}