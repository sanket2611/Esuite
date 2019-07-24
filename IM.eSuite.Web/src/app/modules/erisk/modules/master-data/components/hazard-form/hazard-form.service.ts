import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { HazardService } from '../../../../services/hazard.service';
import { Observable } from 'rxjs/Observable';
import { HazardGet } from '../../models/hazard-get.model';
import { HazardSave } from '../../models/hazard-save.model';

@Injectable()
export class HazardFormService {

  constructor(private hazardService: HazardService, private translateService: TranslateService,
    private toastrService: ToastrService, private router: Router) { }
  
  createHazard(hazard: HazardSave): Observable<HazardGet>{
    return this.hazardService.create(hazard).do(
      result => {
        this.saveSuccess("eRisk.HazardManagement.SuccessfullyCreated", hazard.plantId);           
      });
  }

  updateHazard(id: number, hazard: HazardSave): Observable<any>{
    
    return this.hazardService.update(id, hazard).do(() => {
        this.saveSuccess("eRisk.HazardManagement.SuccessfullyUpdated" , hazard.plantId);
      },
      error => {
        if(error){          
          switch(error.status){
            case 404:
              this.translateService.get("eRisk.HazardManagement.NotFound", { id: id })
                .subscribe(message => this.toastrService.error(message));              
              break;
            default:
              break;
          }
        }
      });
  }

  private saveSuccess(messageTranslationKey: string , plantId : number )
  {
    this.translateService.get(messageTranslationKey)
      .subscribe(message => { 
        this.toastrService.success(message).onHidden.subscribe(() => 
          this.router.navigate(['/e-risk/master-data/hazard' , plantId ]));            
      });
  }
}
