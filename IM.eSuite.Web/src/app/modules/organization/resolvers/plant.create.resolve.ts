import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { PlantService } from '../services/plant.service';

@Injectable()
export class PlantCreateResolve implements Resolve<any> {

    constructor(private plantService: PlantService) { }

    resolve(route: ActivatedRouteSnapshot) {
        
        if(route.queryParamMap.has("plantId")){
            let plantId: number = +route.queryParamMap.get("plantId");
            return this.plantService.get(plantId);
        }        
    }
}