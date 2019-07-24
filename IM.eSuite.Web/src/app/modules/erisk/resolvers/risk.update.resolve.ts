import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { RiskGet } from '../models/risk-get.model';
import { RiskService } from '../services/risk-service';

@Injectable()
export class RiskUpdateResolve implements Resolve<RiskGet> {

    constructor(private riskService: RiskService) { }

    resolve(route: ActivatedRouteSnapshot) {
        let riskId: number = +route.params["id"];        
        return this.riskService.get(riskId);
    }
}