import { ScheduleSave } from "./schedule-save.model";
import { ObservationSave } from "./observation-save.model";

export class SmatSave {
    scheduleId: number;
    shiftId: number;
    ehsKeyPoint: boolean;
    date: Date;
    comment: string;
    schedule: ScheduleSave;
    observations: ObservationSave[];
    feedbackEmails: string[];
}