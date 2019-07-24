import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { UserGroupService } from '../services/user-group.service';

@Injectable()
export class UserGroupListResolve implements Resolve<any> {

    constructor(private userGroupService: UserGroupService) { }

    resolve(route: ActivatedRouteSnapshot) {
        return this.userGroupService.getByApplication();
    }
}