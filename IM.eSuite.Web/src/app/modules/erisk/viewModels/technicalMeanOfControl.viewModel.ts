import { SelectItem } from '@im-angular/core';
import { RiskGet } from '../models/risk-get.model';
import { MeanOfControlTypeEnum } from '../enums/mean-of-control-type.enum';

export class TechnicalMeanOfControlViewModel {
    public comment: string;
    public reliabilityId: number;
    public descriptions: SelectItem[] = new Array<SelectItem>();

    public static fromRiskGet(risk: RiskGet): TechnicalMeanOfControlViewModel {
        let result = new TechnicalMeanOfControlViewModel();
        result.reliabilityId = risk.technicalMesuresReliabilityId;
        result.comment = risk.technicalMesuresComment;
        result.descriptions = risk.meanOfControls.filter(moc => moc.type == MeanOfControlTypeEnum.TechnicalMeasure)
            .map(moc => Object.assign(new SelectItem(), moc));
        return result;
    }
}
