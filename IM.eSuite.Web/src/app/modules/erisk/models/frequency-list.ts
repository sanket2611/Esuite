import { RateSelectItem } from '../viewModels/rate-select-item.viewModel';

export class FrequencyList {
    public id: number;
    public description: string;
    public rate: number;

    public static toSelectItem(frequency: FrequencyList): RateSelectItem {
        let result = new RateSelectItem();
        result.id = frequency.id;
        result.text = frequency.description;
        result.rate = frequency.rate;
        return result;
    }
}
