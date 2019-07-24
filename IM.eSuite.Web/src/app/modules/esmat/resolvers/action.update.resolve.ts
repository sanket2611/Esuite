import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { EsmatActionPlanService } from '../services/esmat-action-plan.service';
import { ActionPlanGet } from '../../eaction/models/action-plan-get.model';

@Injectable()
export class ActionUpdateResolve implements Resolve<ActionPlanGet> {

    constructor(private esmatActionPlanService: EsmatActionPlanService) { }

    resolve(route: ActivatedRouteSnapshot) {
        let actionId: number = +route.params["id"];        
        return this.esmatActionPlanService.get(actionId);
    }
}