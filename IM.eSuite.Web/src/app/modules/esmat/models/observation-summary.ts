import { ScheduleGet } from "./schedule-get.model";

export class ObservationSummary {
    plant: string;
    department: string;
    workshop: string;
    job: string;
    workstation: string;
    task: string;
    smateeFirstName: string;
    smateeLastName: string;
    category: string;
    subCategory: string;
    actionPlanId: number;
    schedule: ScheduleGet;
}