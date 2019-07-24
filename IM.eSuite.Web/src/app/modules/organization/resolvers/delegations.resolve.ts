import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { DelegationService } from '../services/delegation.service';


@Injectable()
export class DelegationsResolve implements Resolve<any> {

    constructor(private delegationService: DelegationService) { }

    resolve(route: ActivatedRouteSnapshot) {        
        return this.delegationService.search(undefined);
    }
}