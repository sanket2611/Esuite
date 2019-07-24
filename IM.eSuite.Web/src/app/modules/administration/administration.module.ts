import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { AdministrationRoutingModule } from "./administration-routing.module";

import { UserListComponent } from "./components/user-list/user-list.component";
import { UserListFilterComponent } from './components/user-list-filter/user-list-filter.component';
import { UserFormComponent } from "./components/user-form/user-form.component";
import { UserFormPlantFilterComponent } from './components/user-form-plant-filter/user-form-plant-filter.component';
import { UserDeleteComponent } from "./components/user-delete/user-delete.component";

import { UserService } from "./services/user.service";
import { UserFormService } from "./components/user-form/user-form.service";
import { UserGroupService } from "./services/user-group.service";

import { UsersResolve } from "./resolvers/users.resolve";
import { UserUpdateResolve } from "./resolvers/user.update.resolve";
import { UserGroupListResolve } from "./resolvers/user-group.list.resolve";
import { UserImportComponent } from './components/user-import/user-import.component';

@NgModule({
    imports: [
        SharedModule,
        AdministrationRoutingModule
    ],
    declarations: [
        UserListComponent,
        UserListFilterComponent,
        UserFormComponent,
        UserFormPlantFilterComponent,
        UserDeleteComponent,
        UserImportComponent        
    ],
    providers: [
        UserService,
        UserFormService,
        UserGroupService,
        UsersResolve,
        UserUpdateResolve,
        UserGroupListResolve
    ]
})
export class AdministrationModule {}