import { ReportingRequest } from "../../../../../models/reporting-request.model";

export class ObservationReportingRequest extends ReportingRequest {
    public typeId: number;
    public categoryId: number;
}