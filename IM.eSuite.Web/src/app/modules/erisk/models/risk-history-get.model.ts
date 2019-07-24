import { ScoreGet } from "./score-get.model";
import { User } from "@im-angular/authentication";

export class RiskHistoryGet {    
    public withMeansOfControlScore : ScoreGet;
    public hazardDescription : string;
    public addedAt : Date;
    public user : User;
}