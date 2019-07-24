import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { APPSETTINGS } from '../../../configs/appSettings';
import { PagedList } from '@im-angular/core';
import { ActionPlanService } from '../services/action-plan.service';
import { ActionPlanList } from '../models/action-plan-list.model';
import { ActionPlanListRequest } from '../models/action-plan-list-request.model';
import { environment } from '../../../../environments/environment';

@Injectable()
export class ActionsResolve implements Resolve<PagedList<ActionPlanList>> {

    constructor(private actionPlanService: ActionPlanService) { }

    resolve() {
        let request = new ActionPlanListRequest();
        request.pageNumber = 1;
        request.pageSize = APPSETTINGS.PAGE_SIZE.DEFAULT_SIZE;
        return this.actionPlanService.list(environment.eActionApi.keyId.eAction, request);
    }
}