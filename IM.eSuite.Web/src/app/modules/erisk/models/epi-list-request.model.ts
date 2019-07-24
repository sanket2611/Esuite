import { ListRequest } from "@im-angular/core";

export class EpiListRequest extends ListRequest
{
    public epiCategoryId: number;
    public plantId: number;
    public onlyActiveForPlant : boolean;
}