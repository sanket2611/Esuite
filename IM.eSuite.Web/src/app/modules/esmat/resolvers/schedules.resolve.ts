import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { APPSETTINGS } from '../../../configs/appSettings';
import { ScheduleService } from '../services/schedule.service';
import { PagedList } from '@im-angular/core';
import { ScheduleListRequest } from '../models/schedule-list-request.model';
import { ScheduleList } from '../models/schedule-list.model';

@Injectable()
export class SchedulesResolve implements Resolve<PagedList<ScheduleList>> {

    constructor(private scheduleService: ScheduleService) { }

    resolve(route: ActivatedRouteSnapshot) {
        let request = new ScheduleListRequest();
        request.pageNumber = 1;
        request.pageSize = APPSETTINGS.PAGE_SIZE.DEFAULT_SIZE;
        request.havingSmat = false;  
        return this.scheduleService.list(request);
    }
}