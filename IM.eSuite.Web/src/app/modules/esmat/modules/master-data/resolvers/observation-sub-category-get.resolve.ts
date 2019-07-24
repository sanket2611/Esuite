import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { ObservationSubCategoryService } from '../../../services/observation-sub-category.service';
import { ObservationSubCategoryGet } from '../../../models/observation-sub-category-get.model';

@Injectable()
export class ObservationSubCategoryGetResolve implements Resolve<ObservationSubCategoryGet> {

    constructor(private observationSubCategoryService: ObservationSubCategoryService) { }

    resolve(route: ActivatedRouteSnapshot) {
        let id: number = +route.params["id"];
        let plantId: number = +route.params["plantId"];
        return this.observationSubCategoryService.get(id, plantId);
    }
}