import { Plant } from "../../organization/models/plant";
import { ScheduleViewModel } from "../viewModels/schedule.viewModel";
import { LocationSave } from "../../eaction/models/location-save.model";

export class ScheduleGet {
    id: number;
    plantId: number;
    departmentId: number;
    workshopId: number;
    jobId: number;
    workstationId: number;
    taskId: number;
    dueDate: Date;
    smatorIds: number[];
    smateeIds: number[];
    plant: Plant;

    public static toScheduleViewModel(schedule: ScheduleGet): ScheduleViewModel {
        let result = new ScheduleViewModel();
        result.id = schedule.id;
        result.plantId = schedule.plantId;
        result.departmentId = schedule.departmentId;
        result.workshopId = schedule.workshopId;
        result.jobId = schedule.jobId;
        result.workstationId = schedule.workstationId;
        result.taskId = schedule.taskId;        
        result.dueDate = new Date(schedule.dueDate);
        
        if(schedule.smatorIds.length > 0)
        {
            result.smatLeaderId = schedule.smatorIds[0];
        }
        
        result.smatLeader2Id = null;
        if(schedule.smatorIds.length > 1)
        {
            result.smatLeader2Id = schedule.smatorIds[1];
        }

        if(schedule.smateeIds.length > 0)
        {
            result.smatReceiverId = schedule.smateeIds[0];
        }

        result.smatReceiver2Id = null;
        if(schedule.smateeIds.length > 1)
        {
            result.smatReceiver2Id = schedule.smateeIds[1];
        }
        return result;
    }

    public toLocationSave(): LocationSave{
        let location = new LocationSave();
        location = new LocationSave();
        location.plantId = this.plantId;
        location.departmentId = this.departmentId;
        location.workshopId = this.workshopId;
        location.jobId = this.jobId;
        location.workstationId = this.workstationId;
        location.taskId = this.taskId;
        return location;
    }
}