import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserListComponent } from './components/user-list/user-list.component';
import { UserFormComponent } from './components/user-form/user-form.component';

import { UsersResolve } from './resolvers/users.resolve';
import { UserGroupListResolve } from './resolvers/user-group.list.resolve';
import { UserUpdateResolve } from './resolvers/user.update.resolve';
import { DelegationsResolve } from '../organization/resolvers/delegations.resolve';
import { SectorsResolve } from '../organization/resolvers/sectors.resolve';

const routes: Routes = [
  { path : '', component: UserListComponent, resolve : { users: UsersResolve }},
  { path : 'form', component: UserFormComponent, resolve: { userGroups: UserGroupListResolve, delegations: DelegationsResolve, sectors: SectorsResolve } },
  { path : 'form/:id', component: UserFormComponent, resolve: { user: UserUpdateResolve, userGroups: UserGroupListResolve, delegations: DelegationsResolve, sectors: SectorsResolve }}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }