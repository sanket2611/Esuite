import { UserViewModel } from "./user.viewModel";

export class RiskHistoryViewModel {
    public lastUpdate : Date;
    public previousScore : number;
    public description : string;
    public user : UserViewModel;
}