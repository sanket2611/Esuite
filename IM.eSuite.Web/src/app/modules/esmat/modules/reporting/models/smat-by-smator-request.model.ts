import { ListRequest } from "@im-angular/core";

export class SmatBySmatorRequest extends ListRequest{
    public plantId: number;    
    public search: string;
}