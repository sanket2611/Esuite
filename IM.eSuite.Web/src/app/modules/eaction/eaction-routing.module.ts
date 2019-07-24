import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from '@im-angular/authentication';
import { ActionsResolve } from './resolvers/actions.resolve';
import { ActionUpdateResolve } from './resolvers/action.update.resolve';
import { PlantsResolve } from '../organization/resolvers/plants.resolve';
import { CategoriesResolve } from './resolvers/categories.resolve';
import { ActionRootComponent } from './components/action-root/action-root.component';
import { HomeComponent } from './components/home/home.component';
import { ActionFormComponent } from './components/action-form/action-form.component';

const routes: Routes = [
  { path : '', component: ActionRootComponent, canActivate: [AuthenticationGuard], children: [
    { path : '', component: HomeComponent, resolve: { plants: PlantsResolve, actions: ActionsResolve } },    
    { path : 'form', component: ActionFormComponent, resolve: { plants: PlantsResolve, categories: CategoriesResolve } },
    { path : 'form/:id', component: ActionFormComponent, resolve: { action: ActionUpdateResolve, categories: CategoriesResolve } }
  ]},
  { path : ':source', component: ActionRootComponent, canActivate: [AuthenticationGuard], children: [
    { path : '', component: HomeComponent, resolve: { plants: PlantsResolve, actions: ActionsResolve } },
    { path : 'form', component: ActionFormComponent, resolve: { plants: PlantsResolve, categories: CategoriesResolve } },
    { path : 'form/:id', component: ActionFormComponent, resolve: { action: ActionUpdateResolve, categories: CategoriesResolve } }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EactionRoutingModule { }