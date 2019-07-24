import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { EpiService } from '../../../services/epi.service';
import { PagedList } from '@im-angular/core';
import { EpiList } from '../../../models/epi-list.model';
import { EpiListRequest } from '../../../models/epi-list-request.model';
import { APPSETTINGS } from '../../../../../configs/appSettings';

@Injectable()
export class EpiResolve implements Resolve<PagedList<EpiList>> {

    constructor(private epiService: EpiService) { }

    resolve(route: ActivatedRouteSnapshot) {
        let request = new EpiListRequest();
        request.pageNumber = 1;
        request.pageSize = APPSETTINGS.PAGE_SIZE.DEFAULT_SIZE;    
        return this.epiService.list(request);
    }
}