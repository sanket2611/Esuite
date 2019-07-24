import { ScoreSelectItem } from '../viewModels/score-select-item.viewModel';

export class ChronicRiskScoreList {
    public id: number;
    public description: string;
    public score: number;

    public static toSelectItem(severity: ChronicRiskScoreList): ScoreSelectItem {
        let result = new ScoreSelectItem();
        result.id = severity.id;
        result.text = severity.description;
        result.score = severity.score;
        return result;
    }
}
