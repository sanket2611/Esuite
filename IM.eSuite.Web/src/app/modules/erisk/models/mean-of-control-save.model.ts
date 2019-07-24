import { MeanOfControlTypeEnum } from "../enums/mean-of-control-type.enum";
import { MeanOfControlDescriptionSave } from "./mean-of-control-description-save.model";

export class MeanOfControlSave {
    public type: MeanOfControlTypeEnum;
    public plantId: number;
    public descriptions: MeanOfControlDescriptionSave[];    
}