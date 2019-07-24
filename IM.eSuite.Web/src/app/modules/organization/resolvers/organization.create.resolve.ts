import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { OrganizationService } from '../services/organization.service';

@Injectable()
export class OrganizationCreateResolve implements Resolve<any> {

    constructor(private organizationService: OrganizationService) { }

    resolve(route: ActivatedRouteSnapshot) {
        
        if(route.queryParamMap.has("parentId")){
            let parentId: number = +route.queryParamMap.get("parentId");
            return this.organizationService.get(parentId);
        }        
    }
}