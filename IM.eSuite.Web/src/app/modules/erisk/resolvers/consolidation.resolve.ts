import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { APPSETTINGS } from '../../../configs/appSettings';
import { PagedList } from '@im-angular/core';
import { ConsolidationList } from '../models/consolidation-list.model';
import { ConsolidationListRequest } from '../models/consolidation-list-request.model';
import { ConsolidationService } from '../services/consolidation.service';

@Injectable()
export class ConsolidationResolve implements Resolve<PagedList<ConsolidationList>> {

    constructor(private consolidationService: ConsolidationService) { }

    resolve(route: ActivatedRouteSnapshot) {
        let request = new ConsolidationListRequest();
        request.pageNumber = 1;
        request.pageSize = APPSETTINGS.PAGE_SIZE.DEFAULT_SIZE;
        return this.consolidationService.list(request);
    }
}
