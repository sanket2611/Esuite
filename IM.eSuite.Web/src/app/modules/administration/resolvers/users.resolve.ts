import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import { APPSETTINGS } from '../../../configs/appSettings';

@Injectable()
export class UsersResolve implements Resolve<any> {

    constructor(private userService: UserService) { }

    resolve(route: ActivatedRouteSnapshot) {
        return this.userService.list(1, APPSETTINGS.PAGE_SIZE.DEFAULT_SIZE);
    }
}