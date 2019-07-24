import { LanguageDescriptionViewModel } from "../../shared/viewModels/language-description.viewModel";
import { MeanOfControlTypeEnum } from "../enums/mean-of-control-type.enum";
import { MeanOfControlSave } from "../models/mean-of-control-save.model";
import { MeanOfControlDescriptionSave } from "../models/mean-of-control-description-save.model";
import { MeanOfControlGet } from "../models/mean-of-control-get.model";
import { MeanOfControlDescriptionGet } from "../models/mean-of-control-description-get.model";

export class MeanOfControlViewModel {
    public plantId: number;
    public type: MeanOfControlTypeEnum;    
    public descriptions: LanguageDescriptionViewModel[] = new Array<LanguageDescriptionViewModel>();

    public toMeanOfControlSave(): MeanOfControlSave {
        var meanOfOControl = new MeanOfControlSave();
        meanOfOControl.type = this.type;
        meanOfOControl.plantId = this.plantId;
        meanOfOControl.descriptions = this.descriptions.map(d => new MeanOfControlDescriptionSave(d.languageId, d.value));
        return meanOfOControl;
    }

    toMeanOfControlGet() : MeanOfControlGet {
        var meanOfControl = new MeanOfControlGet();
        meanOfControl.type = this.type;
        meanOfControl.plantId = this.plantId;
        meanOfControl.descriptions = this.descriptions.map(d => new MeanOfControlDescriptionGet(d.id, d.languageId, d.language, d.value));
        return meanOfControl;
    }
}