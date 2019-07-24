import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ReliabilityService } from '../services/Reliability.service';

@Injectable()
export class ReliabilitiesResolve implements Resolve<any> {

    constructor(private reliabilityService:ReliabilityService) { }

    resolve() {   
        return this.reliabilityService.get();
    }
}