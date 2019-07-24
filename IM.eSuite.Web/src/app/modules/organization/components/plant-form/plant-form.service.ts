import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { PlantService } from '../../services/plant.service';
import { Plant } from '../../models/plant';

@Injectable()
export class PlantFormService {

  constructor(private plantService: PlantService, private translateService: TranslateService,
    private toastrService: ToastrService, private router: Router) { }

  createPlant(plant: Plant): Observable<number>{
    let p = this.sanitizePlant(plant);
    return this.plantService.create(p).do(
      result => {
        this.saveSuccess("Plant.SuccessfullyCreated", plant.name);
      },
      error => {
        if(error){          
          switch(error.status){
            case 409:
              this.translateService.get("Plant.AlreadyExists", { gaiaCode: plant.gaiaCode })
                .subscribe(message => this.toastrService.error(message));
              break;
            default:
              break;
          }
        }
      });
  }

  updatePlant(plant: Plant): Observable<any>{
    let p = this.sanitizePlant(plant);
    return this.plantService.update(p).do(result => {
        this.saveSuccess("Plant.SuccessfullyUpdated", plant.name);
      },
      error => {
        if(error){          
          switch(error.status){
            case 404:
              this.translateService.get("Plant.NotFound", { id: plant.id })
                .subscribe(message => this.toastrService.error(message));              
              break;
            case 409:
              this.translateService.get("Plant.AlreadyExists", { gaiaCode: plant.gaiaCode })
                .subscribe(message => this.toastrService.error(message));
              break;
            default:
              break;
          }
        }
      });
  }

  private sanitizePlant(plant: Plant) : Plant{
    let result = new Plant(plant);
    result.country = undefined;
    result.soa = undefined;
    return result;
  }

  private saveSuccess(messageTranslationKey: string, name: string)
  {
    this.translateService.get(messageTranslationKey, { name: name })
      .subscribe(message => { 
        this.toastrService.success(message).onHidden.subscribe(() => 
          this.router.navigate(['/organizations']));            
      });
  }
}
