import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { Plant } from "../../../../organization/models/plant";
import { PlantService } from "../../../../organization/services/plant.service";


@Injectable()
export class PlantGetResolve implements Resolve<Plant> {

    constructor(private plantService: PlantService) { }

    resolve(route: ActivatedRouteSnapshot) {
        let plantId: number = +route.params["plantId"];        
        return this.plantService.get(plantId);
    }
}