import { SelectItem } from '@im-angular/core';
import { RiskGet } from '../models/risk-get.model';

export class EpiMeanOfControlViewModel {
    public employeeType: string;
    public comment: string;
    public reliabilityId: number;
    public descriptions: SelectItem[] = new Array<SelectItem>();

    public static fromRiskGet(risk: RiskGet): EpiMeanOfControlViewModel {
        let result = new EpiMeanOfControlViewModel();
        result.reliabilityId = risk.specificEpisReliabilityId;
        result.comment = risk.specificEpisComment;
        result.employeeType = risk.employeesCategories;
        result.descriptions = risk.specificTaskEpiIds.map(id => Object.assign(new SelectItem(), { id: id }));
        return result;
    }
}
