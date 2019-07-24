import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { ObservationService } from '../services/observation.service';
import { ObservationSummary } from '../models/observation-summary';

@Injectable()
export class ObservationGetResolve implements Resolve<ObservationSummary> {

    constructor(private observationService: ObservationService) { }

    resolve(route: ActivatedRouteSnapshot) {
        let observationId: number = +route.params['observationId'];
        return this.observationService.get(observationId);
    }
}