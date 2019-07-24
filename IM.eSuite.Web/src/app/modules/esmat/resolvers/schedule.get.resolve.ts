import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { ScheduleGet } from '../models/schedule-get.model';
import { ScheduleService } from '../services/schedule.service';

@Injectable()
export class ScheduleGetResolve implements Resolve<ScheduleGet> {

    constructor(private scheduleService: ScheduleService) { }

    resolve(route: ActivatedRouteSnapshot) {
        let scheduleId: number = +route.params["scheduleId"];        
        return this.scheduleService.get(scheduleId);
    }
}