import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { SmatService } from '../services/smat.service';
import { SmatGet } from '../models/smat-get.model';

@Injectable()
export class SmatUpdateResolve implements Resolve<SmatGet> {

    constructor(private smatService: SmatService) { }

    resolve(route: ActivatedRouteSnapshot) {
        let smatId: number = +route.params["id"];
        return this.smatService.get(smatId);
    }
}