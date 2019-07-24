import { MeanOfControlTypeEnum } from "../enums/mean-of-control-type.enum";
import { MeanOfControlSelectItem } from "../viewModels/mean-of-control-select-item.viewModel";

export class MeanOfControlList
{
    public id: number;
    public type: MeanOfControlTypeEnum;
    public description: string;

    public static toMeanOfControlSelectItem(meanOfControl: MeanOfControlList): MeanOfControlSelectItem
    {
        var result = new MeanOfControlSelectItem();
        result.id = meanOfControl.id;
        result.text = meanOfControl.description;
        result.type = meanOfControl.type;
        return result;
    }
}