import { ListRequest } from "@im-angular/core";

export class OrganizationListRequest extends ListRequest {
    public parentId?: number;
    public plantId?: number;
}