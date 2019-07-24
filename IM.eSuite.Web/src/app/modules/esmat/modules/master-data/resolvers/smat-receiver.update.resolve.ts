import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { SmatReceiverService } from '../../../services/smat-receiver.service';

@Injectable()
export class SmatReceiverUpdateResolve implements Resolve<any> {

    constructor(private smatReceiverService: SmatReceiverService) { }

    resolve(route: ActivatedRouteSnapshot) {
        let smatReceiverId: number = +route.params["id"];        
        return this.smatReceiverService.get(smatReceiverId);
    }
}