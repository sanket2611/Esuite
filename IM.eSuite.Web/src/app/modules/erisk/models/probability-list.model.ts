import { RateSelectItem } from '../viewModels/rate-select-item.viewModel';

export class ProbabilityList {
    public id: number;
    public description: string;
    public rate: number;    
    
    public static toRateSelectItem(probability: ProbabilityList): RateSelectItem {
        let result = new RateSelectItem();
        result.id = probability.id;
        result.text = probability.description;
        result.rate = probability.rate;
        return result;
    }
}