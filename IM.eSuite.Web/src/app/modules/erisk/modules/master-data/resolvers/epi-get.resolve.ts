import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { EpiGet } from '../models/epi-get.model';
import { EpiService } from '../../../services/epi.service';

@Injectable()
export class EpiGetResolve implements Resolve<EpiGet> {

    constructor(private epiService: EpiService) { }

    resolve(route: ActivatedRouteSnapshot) {
        let id: number = +route.params["id"];        
        return this.epiService.get(id);
    }
}