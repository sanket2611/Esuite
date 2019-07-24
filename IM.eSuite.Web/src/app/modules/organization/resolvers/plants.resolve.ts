import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { PlantListRequest } from '../models/plantListRequest';
import { PlantService } from '../services/plant.service';
import { APPSETTINGS } from '../../../configs/appSettings';

@Injectable()
export class PlantsResolve implements Resolve<any> {

    constructor(private plantService: PlantService) { }

    resolve(route: ActivatedRouteSnapshot) {
        let request = new PlantListRequest();
        request.pageNumber = 1;
        request.pageSize = APPSETTINGS.PAGE_SIZE.DEFAULT_SIZE;
        
        return this.plantService.list(request);
    }
}