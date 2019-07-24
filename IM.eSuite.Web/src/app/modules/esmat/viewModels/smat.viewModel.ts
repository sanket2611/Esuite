import { ScheduleViewModel } from "./schedule.viewModel";
import { ObservationViewModel } from "./observation.viewModel";
import { SmatSave } from "../models/smat-save.model";
import { SmatGet } from "../models/smat-get.model";
import { ScheduleGet } from "../models/schedule-get.model";

export class SmatViewModel {

    public schedule: ScheduleViewModel = new ScheduleViewModel();
    public observations: ObservationViewModel[] = new Array<ObservationViewModel>();
    public shiftId: number;
    public ehsKeyPoint: boolean;
    public date: Date;
    public feedbackEmails: string[] = new Array<string>();
    public comment: string;

    public toSmatSave(): SmatSave {
        let result = new SmatSave();
        if(this.schedule.id){
            result.scheduleId = this.schedule.id;
        }        
        result.schedule = Object.assign(new ScheduleViewModel(), this.schedule).toScheduleSave();
        result.shiftId = this.shiftId;
        result.ehsKeyPoint = this.ehsKeyPoint;
        result.date = new Date(Date.UTC(this.date.getFullYear(), this.date.getMonth(), this.date.getDate()));
        result.feedbackEmails = this.feedbackEmails;
        result.comment = this.comment;        
        result.observations = this.observations.map(o => {
            return Object.assign(new ObservationViewModel(), o).toObservationSave();        
        });
        return result;
    }

    public static fromSmatGet(smat: SmatGet) : SmatViewModel{
        let result = new SmatViewModel();
        if(smat){
            result.shiftId = smat.shiftId;
            result.date = Object.assign(new Date(), smat.date);            
            result.comment = smat.comment;
            result.feedbackEmails = smat.feedbackEmails;
            result.ehsKeyPoint = smat.ehsKeyPoint;
            result.schedule = ScheduleGet.toScheduleViewModel(smat.schedule);
        }
        return result;
    }
}