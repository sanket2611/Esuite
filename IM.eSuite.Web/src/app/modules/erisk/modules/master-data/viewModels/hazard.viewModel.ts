import { LanguageDescriptionViewModel } from "../../../../shared/viewModels/language-description.viewModel";
import { HazardSave } from "../models/hazard-save.model";
import { HazardDescriptionSave } from "../models/hazard-description-save.model";
import { HazardGet } from "../models/hazard-get.model";

export class HazardViewModel {
    public id: number;
    public plantId : number;
    public descriptions: LanguageDescriptionViewModel[] = new Array<LanguageDescriptionViewModel>();

    toHazardSave(): HazardSave{
        var hazard = new HazardSave();
        hazard.id = this.id;
        hazard.plantId= this.plantId;
        hazard.descriptions = this.descriptions.map(d => new HazardDescriptionSave(d.id, d.languageId, d.value));
        return hazard;
    }

    static getFromHazardGet(hazard: HazardGet): HazardViewModel{
        var result = new HazardViewModel();
        result.id = hazard.id;
        result.plantId = hazard.plantId;
        result.descriptions = hazard.descriptions.map(d => {
            var desc = new LanguageDescriptionViewModel();
            desc.id = d.id;
            desc.language = d.language;
            desc.languageId = d.languageId;
            desc.value = d.value;
            return desc;
        });
        return result;
    }
}