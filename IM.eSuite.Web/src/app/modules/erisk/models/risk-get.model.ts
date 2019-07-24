import { LocationGet } from "../../eaction/models/location-get.model";
import { ScoreGet } from "./score-get.model";
import { MeanOfControlGet } from "./mean-of-control-get.model";
import { RiskHistoryGet } from "./risk-history-get.model";

export class RiskGet {
    public id: number;
    public lastEvaluationDate: Date;
    public jobDescription: string;
    public otherRiskSource: string;
    public hazardId: number;
    public actionPlanId : number;
    public technicalMesuresReliabilityId: number;
    public technicalMesuresComment: string;
    public organisationAndBehaviorReliabilityId: number;
    public organisationAndBehaviorComment: string;
    public specificEpisReliabilityId: number;
    public specificEpisComment: string;
    public employeesCategories: string;
    public moreInformationsFilePath: string;
    public moreInformationsComment: string;
    public addedAt : Date;
    public location: LocationGet;
    public withoutMeansOfControlScore: ScoreGet;

    public riskHistories: RiskHistoryGet[]= new Array<RiskHistoryGet>();
    public meanOfControls: MeanOfControlGet[] = new Array<MeanOfControlGet>();
    public standardEvaluationFeedbackIds: number[] = new Array<number>();
    public riskSourceIds: number[] = new Array<number>();
    public minimumJobEpiIds: number[] = new Array<number>();
    public specificTaskEpiIds: number[] = new Array<number>();
}