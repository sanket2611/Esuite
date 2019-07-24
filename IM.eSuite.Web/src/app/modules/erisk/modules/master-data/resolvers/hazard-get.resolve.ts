import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { HazardGet } from '../models/hazard-get.model';
import { HazardService } from '../../../services/hazard.service';

@Injectable()
export class HazardGetResolve implements Resolve<HazardGet> {

    constructor(private hazardService: HazardService) { }

    resolve(route: ActivatedRouteSnapshot) {
        let id: number = +route.params["id"];        
        return this.hazardService.get(id);
    }
}