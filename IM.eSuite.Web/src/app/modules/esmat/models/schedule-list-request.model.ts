import { ListRequest } from "@im-angular/core";

export class ScheduleListRequest extends ListRequest {
    plantId: number;
    departmentId: number;
    workshopId: number;
    jobId: number;
    workstationId: number;
    startDate: string;
    endDate: string;
    havingSmat: boolean;
}