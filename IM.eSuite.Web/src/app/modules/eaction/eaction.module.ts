import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { EactionRoutingModule } from './eaction-routing.module';
import { ActionRootComponent } from './components/action-root/action-root.component';
import { HomeComponent } from './components/home/home.component';
import { SourceService } from './services/source.service';
import { ActionsResolve } from './resolvers/actions.resolve';
import { ActionUpdateResolve } from './resolvers/action.update.resolve';
import { ActionPlanListFilterComponent } from './components/action-plan-list-filter/action-plan-list-filter.component';
import { ActionFormComponent } from './components/action-form/action-form.component';
import { CategoryService } from './services/category.service';
import { SubCategoryService } from './services/sub-category.service';
import { CategoriesResolve } from './resolvers/categories.resolve';

@NgModule({
  imports: [
    SharedModule,
    EactionRoutingModule
  ],
  declarations: [
    ActionRootComponent, 
    HomeComponent,
    ActionPlanListFilterComponent,
    ActionFormComponent
  ],
  providers:[
    SourceService,
    ActionsResolve,
    ActionUpdateResolve,
    CategoryService,
    CategoriesResolve,
    SubCategoryService
  ]
})
export class EactionModule { }
