import { SelectItem } from '@im-angular/core';
import { RiskGet } from '../models/risk-get.model';
import { MeanOfControlTypeEnum } from '../enums/mean-of-control-type.enum';

export class OrganizationMeanOfControlViewModel {
    public comment: string;
    public reliabilityId: number;
    public descriptions: SelectItem[] = new Array<SelectItem>();
    public others: SelectItem[] = new Array<SelectItem>();
    public trainings: SelectItem[] = new Array<SelectItem>();
    public ruleControls: SelectItem[] = new Array<SelectItem>();
    public communicationAndInformations: SelectItem[] = new Array<SelectItem>();

    public static fromRiskGet(risk: RiskGet): OrganizationMeanOfControlViewModel {
        let result = new OrganizationMeanOfControlViewModel();
        result.reliabilityId = risk.organisationAndBehaviorReliabilityId;
        result.comment = risk.organisationAndBehaviorComment;
        result.descriptions = risk.meanOfControls.filter(moc => moc.type == MeanOfControlTypeEnum.OrganzationAndBehavior)
            .map(moc => Object.assign(new SelectItem(), moc));
        result.communicationAndInformations = risk.meanOfControls.filter(moc => moc.type == MeanOfControlTypeEnum.CommunicationAndInformation)
            .map(moc => Object.assign(new SelectItem(), moc));
        result.ruleControls = risk.meanOfControls.filter(moc => moc.type == MeanOfControlTypeEnum.RulesControl)
            .map(moc => Object.assign(new SelectItem(), moc));
        result.trainings = risk.meanOfControls.filter(moc => moc.type == MeanOfControlTypeEnum.Training)
            .map(moc => Object.assign(new SelectItem(), moc));
        result.others = risk.meanOfControls.filter(moc => moc.type == MeanOfControlTypeEnum.Others)
            .map(moc => Object.assign(new SelectItem(), moc));
        return result;
    }
}
