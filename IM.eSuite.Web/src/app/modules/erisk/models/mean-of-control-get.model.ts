import { MeanOfControlTypeEnum } from "../enums/mean-of-control-type.enum";
import { MeanOfControlDescriptionGet } from "./mean-of-control-description-get.model";

export class MeanOfControlGet {
    public id: number;
    public plantId: number;
    public type: MeanOfControlTypeEnum;
    public descriptions: MeanOfControlDescriptionGet[];
}