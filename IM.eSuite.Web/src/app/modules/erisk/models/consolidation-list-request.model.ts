import { ListRequest } from '@im-angular/core';

export class ConsolidationListRequest extends ListRequest {
    plantId: number;
    departmentId: number;
    workshopId: number;
    jobId: number;
    workstationId: number;
    startDate: string;
    endDate: string;
}
