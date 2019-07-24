import { ListRequest } from "@im-angular/core";

export class SmatByEmployeeRequest extends ListRequest{
    public plantId: number;    
    public search: string;
}