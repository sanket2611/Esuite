import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { ScheduleService } from '../services/schedule.service';

@Injectable()
export class ScheduleUpdateResolve implements Resolve<any> {

    constructor(private scheduleService: ScheduleService) { }

    resolve(route: ActivatedRouteSnapshot) {
        let scheduleId: number = +route.params["id"];        
        return this.scheduleService.get(scheduleId);
    }
}