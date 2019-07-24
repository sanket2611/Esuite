import { ScheduleGet } from "./schedule-get.model";
import { ObservationGet } from "./observation-get.model";

export class SmatGet {
    schedule: ScheduleGet;
    scheduleId: number;
    shiftId: number;
    ehsKeyPoint: boolean;
    date: Date;
    observations: ObservationGet[];
    comment: string;    
    feedbackEmails: string[];
}