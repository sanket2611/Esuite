import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { SectorService } from '../services/sector.service';

@Injectable()
export class SectorsResolve implements Resolve<any> {

    constructor(private sectorService: SectorService) { }

    resolve(route: ActivatedRouteSnapshot) {        
        return this.sectorService.search(undefined);
    }
}