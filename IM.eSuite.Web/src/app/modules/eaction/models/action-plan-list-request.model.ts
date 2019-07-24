import { ListRequest } from "@im-angular/core";
import { SourceEnum } from "../enums/source.enum";

export class ActionPlanListRequest extends ListRequest {
    plantId: number;
    application: SourceEnum;
    search: string;
}