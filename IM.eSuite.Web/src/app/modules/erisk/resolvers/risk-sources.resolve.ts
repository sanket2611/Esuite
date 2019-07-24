import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { RiskSourceService } from '../services/risk-source.service';
import { RiskSourceList } from '../models/risk-source-list.model';

@Injectable()
export class RiskSourcesResolve implements Resolve<RiskSourceList[]> {

    constructor(private riskSourceService:RiskSourceService) { }

    resolve() {        
        return this.riskSourceService.get();
    }
}