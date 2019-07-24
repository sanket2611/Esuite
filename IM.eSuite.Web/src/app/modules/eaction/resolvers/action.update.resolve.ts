import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { ActionPlanService } from '../services/action-plan.service';
import { ActionPlanGet } from '../models/action-plan-get.model';
import { environment } from '../../../../environments/environment';

@Injectable()
export class ActionUpdateResolve implements Resolve<ActionPlanGet> {

    constructor(private actionPlanService: ActionPlanService) { }

    resolve(route: ActivatedRouteSnapshot) {
        let actionId: number = +route.params["id"];        
        return this.actionPlanService.get( environment.eActionApi.keyId.eAction, actionId);
    }
}