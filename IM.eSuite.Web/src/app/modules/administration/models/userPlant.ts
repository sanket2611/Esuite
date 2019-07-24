import { Plant } from "../../organization/models/plant";

export class UserPlant {
    userId: number;
    plantId: number;
    plant: Plant;

    constructor(userPlant?: UserPlant) {       
        
        if(userPlant){
            this.userId = userPlant.userId;
            this.plantId = userPlant.plantId;
            this.plant = new Plant(userPlant.plant);
        }
        else {
            this.plant = new Plant();
        }
    }
}