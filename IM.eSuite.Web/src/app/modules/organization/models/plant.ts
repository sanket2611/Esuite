import { SelectItem } from "@im-angular/core";
import { Organization } from "./organization";
import { Country } from "./country";
import { SOA } from "./soa";

export class Plant extends Organization {    
    public gaiaCode: number;
    public countryId: number;
    public country: Country;
    public soaId: number;
    public soa: SOA;

    constructor(plant?: Plant){
        super(plant);
        if(plant){
            this.gaiaCode = plant.gaiaCode;
            this.countryId = plant.countryId;
            this.soaId = plant.soaId;
        }

        this.country = new Country();
        this.soa = new SOA();
    }

    public static toSelectItem(plant: Plant): SelectItem {
        let result = new SelectItem();
        result.id = plant.id;
        result.text = `${plant.gaiaCode} - ${plant.name}`;
        return result;
    }

    public static comparePlantByName(p1: Plant, p2: Plant): number {
        if(p1.name > p2.name){
            return 1;
        }

        if(p1.name < p2.name){
            return -1;
        }

        return 0;
    }
}