import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { ObservationCategoryService } from '../../../services/observation-category.service';
import { ObservationCategoryGet } from '../../../models/observation-category-get.model';

@Injectable()
export class ObservationCategoryUpdateResolve implements Resolve<ObservationCategoryGet> {

    constructor(private observationCategoryService: ObservationCategoryService) { }

    resolve(route: ActivatedRouteSnapshot) {
        let observationCategoryId: number = +route.params["id"];        
        return this.observationCategoryService.get(observationCategoryId);
    }
}