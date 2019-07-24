import { ReportTypeEnum } from "../enums/report-type-enum";
import { ReportingRequest } from "../../../../../models/reporting-request.model";
import { SmatByOrganizationRequest } from "../models/smat-by-organization-request.model";
import { ObservationReportingRequest } from "../models/observation-reporting-request.model";

export class ReportingFilterViewModel {
    public report: ReportTypeEnum;
    public plantId: number;
    public departmentId: number;
    public workshopId: number;
    public jobId: number;
    public workstationId: number;
    public taskId: number;
    public dateRange: Date[];
    public observationTypeId: number;
    public observationCategoryId: number;
    public search: string;
    public month: number;

    toReportingRequest(): ReportingRequest {
        let result = new ReportingRequest();
        result.plantId = this.plantId;
        result.departmentId = this.departmentId;
        result.workshopId = this.workshopId;
        result.jobId = this.jobId;
        result.taskId = this.taskId;        
        result.startDate = this.dateRange[0].toISOString();
        result.endDate = this.dateRange[1].toISOString();
        return result;
    }

    toSmatByOrganizationRequest(): SmatByOrganizationRequest {
        let result = new SmatByOrganizationRequest();
        result.startDate = this.dateRange[0].toISOString();
        result.endDate = this.dateRange[1].toISOString();
        if(this.workstationId){
            result.organizationId = this.workstationId;
        }
        else if(this.jobId){
            result.organizationId = this.jobId;
        }
        else if(this.workshopId){
            result.organizationId = this.workshopId;
        }
        else if(this.departmentId){
            result.organizationId = this.departmentId;
        }
        else if(this.plantId){
            result.organizationId = this.plantId;
        }
        return result;
    }

    toObservationReportingRequest(): ObservationReportingRequest{
        let result = <ObservationReportingRequest>this.toReportingRequest();
        result.typeId = this.observationTypeId;
        result.categoryId = this.observationCategoryId;        
        return result;
    }
}