import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ProbabilityService } from '../services/probability.service';

@Injectable()
export class ProbabilitiesResolve implements Resolve<any> {

    constructor(private probabilityService: ProbabilityService) { }

    resolve() {        
        return this.probabilityService.list();
    }
}