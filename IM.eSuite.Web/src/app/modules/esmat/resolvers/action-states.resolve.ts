import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { ScheduleService } from '../services/schedule.service';
import { ActionStateEnum } from '../viewModels/action-state';

@Injectable()
export class ActionStatesResolve implements Resolve<any> {

    constructor(private scheduleService: ScheduleService) { }

    resolve(route: ActivatedRouteSnapshot) {
        return [
            {id: ActionStateEnum.Opened, text: 'Opened'},
            {id: ActionStateEnum.Completed, text: 'Completed'},
            {id: ActionStateEnum.Closed, text: 'Closed'},
            {id: ActionStateEnum.Cancelled, text: 'Cancelled'}
        ];
    }
}
