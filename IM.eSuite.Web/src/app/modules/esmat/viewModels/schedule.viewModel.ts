import { ScheduleSave } from '../models/schedule-save.model';
import { LocationSave } from '../../eaction/models/location-save.model';

export class ScheduleViewModel {
    public id: number;
    public plantId: number;
    public departmentId: number;
    public workshopId: number;
    public jobId: number;
    public workstationId: number;
    public taskId: number;
    public dueDate: Date;
    public smatLeaderId: number;
    public smatLeader2Id: number;
    public smatReceiverId: number;
    public smatReceiver2Id: number;

    public toScheduleSave(): ScheduleSave {
        let result = new ScheduleSave();
        if (this.id) {
            result.id = this.id;
        }

        result.plantId = this.plantId;
        result.departmentId = this.departmentId;
        result.workshopId = this.workshopId;
        result.jobId = this.jobId;
        result.workstationId = this.workstationId;
        result.taskId = this.taskId;
        if (this.dueDate != null) {
            result.dueDate = new Date(Date.UTC(this.dueDate.getFullYear(), this.dueDate.getMonth(), this.dueDate.getDate()));
        }

        result.smatorIds = [this.smatLeaderId];
        if (this.smatLeader2Id) {
            result.smatorIds.push(this.smatLeader2Id);
        }

        result.smateeIds = [this.smatReceiverId];
        if (this.smatReceiver2Id) {
            result.smateeIds.push(this.smatReceiver2Id);
        }

        return result;
    }

    public toLocationSave(): LocationSave {
        let result = new LocationSave();
        result.plantId = this.plantId;
        result.departmentId = this.departmentId;
        result.workshopId = this.workshopId;
        result.jobId = this.jobId;
        result.workstationId = this.workstationId;
        result.taskId = this.taskId;
        return result;
    }
}
