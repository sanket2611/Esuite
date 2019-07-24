import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable()
export class UserUpdateResolve implements Resolve<any> {

    constructor(private userService: UserService) { }

    resolve(route: ActivatedRouteSnapshot) {
        let userId: number = +route.params["id"];        
        return this.userService.get(userId);
    }
}