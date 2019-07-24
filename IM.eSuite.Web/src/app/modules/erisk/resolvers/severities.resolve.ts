import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { SeverityService } from '../services/severity.service';

@Injectable()
export class SeveritiesResolve implements Resolve<any> {

    constructor(private severityService: SeverityService) { }

    resolve() {
        return this.severityService.list();
    }
}
