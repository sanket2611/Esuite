import { RateSelectItem } from '../viewModels/rate-select-item.viewModel';

export class SeverityList {
    public id: number;
    public description: string;
    public rate: number;

    public static toSelectItem(severity: SeverityList): RateSelectItem {
        let result = new RateSelectItem();
        result.id = severity.id;
        result.text = severity.description;
        result.rate = severity.rate;
        return result;
    }
}
