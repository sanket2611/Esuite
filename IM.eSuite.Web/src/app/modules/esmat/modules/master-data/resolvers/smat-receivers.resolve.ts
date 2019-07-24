import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { SmatReceiverService } from '../../../services/smat-receiver.service';
import { APPSETTINGS } from '../../../../../configs/appSettings';
import { SmatReceiverListRequest } from '../../../models/smat-receiver-list-request.model';

@Injectable()
export class SmatReceiversResolve implements Resolve<any> {

    constructor(private smatReceiverService: SmatReceiverService) { }

    resolve(route: ActivatedRouteSnapshot) {
        let request = new SmatReceiverListRequest();
        request.pageNumber = 1;
        request.pageSize = APPSETTINGS.PAGE_SIZE.DEFAULT_SIZE;    
        return this.smatReceiverService.list(request);
    }
}