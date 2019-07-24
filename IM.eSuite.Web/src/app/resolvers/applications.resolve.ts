import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { ApplicationService } from '../services/application.service';

@Injectable()
export class ApplicationsResolve implements Resolve<any> {

    constructor(private applicationService: ApplicationService) { }

    resolve(route: ActivatedRouteSnapshot) {
        return this.applicationService.list();
    }
}