import { LocationSave } from "../../eaction/models/location-save.model";
import { ScoreSave } from "./score-save.model";

export class RiskSave {
    public lastEvaluationDate: Date;
    public jobDescription: string;
    public otherRiskSource: string;
    public hazardId: number;
    public actionPlanId : number;
    public hazardDescription: string;
    public technicalMesuresReliabilityId: number;
    public technicalMesuresComment: string;
    public organisationAndBehaviorReliabilityId: number;
    public organisationAndBehaviorComment: string;
    public specificEpisReliabilityId: number;
    public specificEpisComment: string;
    public employeesCategories: string;
    public moreInformationsFilePath: string;
    public moreInformationsComment: string;
    public location: LocationSave;
    public withMeansOfControlScore: ScoreSave;
    public withoutMeansOfControlScore: ScoreSave;

    public meanOfControlIds: number[] = new Array<number>();
    public standardEvaluationFeedbackIds: number[] = new Array<number>();
    public riskSourceIds: number[] = new Array<number>();
    public minimumJobEpiIds: number[] = new Array<number>();
    public specificTaskEpiIds: number[] = new Array<number>();
}