import { EpiSelectItem } from "../viewModels/epi-select-item.viewModel";

export class EpiList
{
    public id: number;
    public description: string;
    public epiCategoryId: number;
    public epiCategoryDescription: string;
    public isEnabled : boolean;
    public isStandard : boolean;

    public static toEpiSelectItem(epi: EpiList): EpiSelectItem
    {
        var result = new EpiSelectItem();
        result.id = epi.id;
        result.text = epi.description;
        result.category = epi.epiCategoryDescription;
        return result;
    }
}