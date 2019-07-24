import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { PlantService } from '../services/plant.service';

@Injectable()
export class PlantUpdateResolve implements Resolve<any> {

    constructor(private plantService: PlantService) { }

    resolve(route: ActivatedRouteSnapshot) {
        let plantId: number = +route.params["id"];        
        return this.plantService.get(plantId);
    }
}