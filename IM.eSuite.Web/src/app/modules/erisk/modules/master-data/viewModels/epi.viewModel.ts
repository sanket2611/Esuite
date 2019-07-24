import { LanguageDescriptionViewModel } from "../../../../shared/viewModels/language-description.viewModel";
import { EpiSave } from "../models/epi-save.model";
import { EpiDescriptionSave } from "../models/epi-description-save.model";
import { EpiGet } from "../models/epi-get.model";

export class EpiViewModel {
    public id: number;
    public plantId : number;
    public epiCategoryId: number;
    public descriptions: LanguageDescriptionViewModel[] = new Array<LanguageDescriptionViewModel>();

    toEpiSave(): EpiSave{
        var epi = new EpiSave();
        epi.id = this.id;
        epi.plantId = this.plantId;
        epi.epiCategoryId = this.epiCategoryId;
        epi.descriptions = this.descriptions.map(d => new EpiDescriptionSave(d.id, d.languageId, d.value));
        return epi;
    }

    static getFromEpiGet(epi: EpiGet): EpiViewModel{
        var result = new EpiViewModel();
        result.id = epi.id;
        result.epiCategoryId = epi.epiCategoryId;
        result.plantId = epi.plantId;
        result.descriptions = epi.descriptions.map(d => {
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