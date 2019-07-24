import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { EpiCategoryService } from '../../../services/epi-category.service';
import { EpiCategoryList } from '../../../models/epi-category-list.model';

@Injectable()
export class EpiCategoriesResolve implements Resolve<Array<EpiCategoryList>> {

    constructor(private epiCategoryService: EpiCategoryService) { }

    resolve(route: ActivatedRouteSnapshot) {
        return this.epiCategoryService.list();
    }
}