import { ListRequest } from "@im-angular/core";

export class SmatReceiverListRequest extends ListRequest {
    plantId: number;
    employeeTypeId: number;
    name: string;
}