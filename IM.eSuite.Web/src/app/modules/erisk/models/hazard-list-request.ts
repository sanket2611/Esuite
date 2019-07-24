import { ListRequest } from "@im-angular/core";

export class HazardListRequest extends ListRequest {
    plantId: number;
    onlyActiveForPlant : boolean;

    constructor(listRequest: ListRequest = null, plantId : number, onlyActiveForPlant : boolean = false ) {
        if (listRequest != null) {
            super();
            this.isDescending = listRequest.isDescending;
            this.pageNumber = listRequest.pageNumber;
            this.pageSize = listRequest.pageSize;
            this.sortBy = listRequest.sortBy;
        }
        this.plantId = plantId;
        this.onlyActiveForPlant = onlyActiveForPlant;
    }
}