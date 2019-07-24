import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { CategoryGet } from '../models/category-get.model';

@Injectable()
export class CategoriesResolve implements Resolve<Array<CategoryGet>> {

    constructor(private categoryService: CategoryService) { }

    resolve() {        
        return this.categoryService.list();
    }
}