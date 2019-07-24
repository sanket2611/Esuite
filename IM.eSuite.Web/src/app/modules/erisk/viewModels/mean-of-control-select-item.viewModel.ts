import { SelectItem } from "@im-angular/core";
import { MeanOfControlTypeEnum } from "../enums/mean-of-control-type.enum";

export class MeanOfControlSelectItem extends SelectItem
{
    public type: MeanOfControlTypeEnum;
}