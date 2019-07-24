import { SelectItem } from "@im-angular/core";
import { Plant } from "../../organization/models/plant";
import { EmployeeType } from "../models/employee-type.model";
import { SmatReceiverSave } from "../models/smat-receiver-save.model";

export class SmatReceiverViewModel {
    public id: number;
    public firstName: string;
    public lastName: string;
    public email: string;
    public jobPosition: string;
    public employeeTypeId: number;
    public employeeType: EmployeeType;
    public plantId: number;
    public plant: Plant;

    public static toSmatReceiverSave(smatReceiver: SmatReceiverViewModel): SmatReceiverSave {
        let result = new SmatReceiverSave();
        result.id = smatReceiver.id;
        result.firstName = smatReceiver.firstName;
        result.lastName = smatReceiver.lastName;
        result.email = smatReceiver.email;
        result.jobPosition = smatReceiver.jobPosition;
        result.employeeTypeId = smatReceiver.employeeTypeId;
        result.plantId = smatReceiver.plantId;
        return result;
    }
}