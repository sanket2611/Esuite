import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { APPSETTINGS } from '../../../configs/appSettings';
import { PagedList } from '@im-angular/core';
import { RiskList } from '../models/risk-list.model';
import { RiskService } from '../services/risk-service';
import { RiskListRequest } from '../models/risk-list-request.model';

@Injectable()
export class AssessmentResolve implements Resolve<PagedList<RiskList>> {

    constructor(private riskService: RiskService) { }

    resolve(route: ActivatedRouteSnapshot) {
        let request = new RiskListRequest();
        request.pageNumber = 1;
        request.pageSize = APPSETTINGS.PAGE_SIZE.DEFAULT_SIZE;
        return this.riskService.list(request);
    }
}
