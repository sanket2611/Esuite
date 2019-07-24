import { ListRequest } from "@im-angular/core";

export class ObservationCategoryListRequest extends ListRequest {
    plantId: number;
    observationTypeId: number;
}