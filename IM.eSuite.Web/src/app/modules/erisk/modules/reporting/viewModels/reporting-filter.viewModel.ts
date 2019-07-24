import { ReportTypeEnum } from "../enums/report-type-enum";
import { ReportingRequest } from "../models/reporting-request.model";

export class ReportingFilterViewModel {
    public report: ReportTypeEnum;
    public plantId: number;
    public departmentId: number;
    public workshopId: number;
    public jobId: number;
    public workstationId: number;
    public taskId: number;
    public dateRange: Date[];
    public year: number;

    toReportingRequest(): ReportingRequest {
        let result = new ReportingRequest();

        if(this.workstationId){
            result.workstationId = this.workstationId;
        }
        else if(this.jobId){
            result.jobId = this.jobId;
        }
        else if(this.workshopId){
            result.workshopId = this.workshopId;
        }
        else if(this.departmentId){
            result.departmentId = this.departmentId;
        }
        else if(this.plantId){
            result.plantId = this.plantId;
        }

        if(this.year)
        {
            result.startDate = new Date(this.year-1,11,31,24,59,59,999).toISOString();
            result.endDate = new Date(this.year,11,31,24,59,59,999).toISOString();
        }
        else
        {
            result.startDate = this.dateRange[0].toISOString();
            result.endDate = this.dateRange[1].toISOString();
        }
        return result;
    }
}