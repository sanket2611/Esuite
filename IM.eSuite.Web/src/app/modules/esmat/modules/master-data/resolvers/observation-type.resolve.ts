import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { ObservationType } from '../../../models/observation-type.model';
import { ObservationTypeService } from '../../../services/observation-type.service';

@Injectable()
export class ObservationTypesResolve implements Resolve<ObservationType[]> {

    constructor(private observationTypeService: ObservationTypeService) { }

    resolve(route: ActivatedRouteSnapshot) {        
        return this.observationTypeService.get();
    }
}