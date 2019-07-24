import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { OrganizationService } from '../services/organization.service';

@Injectable()
export class OrganizationUpdateResolve implements Resolve<any> {

    constructor(private organizationService: OrganizationService) { }

    resolve(route: ActivatedRouteSnapshot) {
        let organizationId: number = +route.params["id"];        
        return this.organizationService.get(organizationId);
    }
}