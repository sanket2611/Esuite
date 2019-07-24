export class RiskList {
    public id: number;
    public lastEvaluationDate: Date;
    public workStation: string;
    public task: string;
    public hazard: string;
    public jobDescription: string;
    public score: number;
    public selected: boolean = false;
}
