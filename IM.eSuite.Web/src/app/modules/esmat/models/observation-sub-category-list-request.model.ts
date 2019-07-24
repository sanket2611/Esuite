import { ListRequest } from "@im-angular/core";

export class ObservationSubCategoryListRequest extends ListRequest {
    plantId: number;
    observationCategoryId: number;
    onlyActiveForPlant: boolean;
}