export class RiskByOrganizationGet {
    public organization: string;
    public count : number;
    public countVeryCriticalRisk: number;
    public countCriticalRisk: number;
    public countMediumRisk: number;
    public countLowRisk: number;
}