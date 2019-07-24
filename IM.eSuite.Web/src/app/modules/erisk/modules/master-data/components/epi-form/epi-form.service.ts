import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { EpiService } from '../../../../services/epi.service';
import { Observable } from 'rxjs/Observable';
import { EpiGet } from '../../models/epi-get.model';
import { EpiSave } from '../../models/epi-save.model';

@Injectable()
export class EpiFormService {

  constructor(private epiService: EpiService, private translateService: TranslateService,
    private toastrService: ToastrService, private router: Router) { }
  
  createEpi(epi: EpiSave): Observable<EpiGet>{
    return this.epiService.create(epi).do(
      result => {
        this.saveSuccess("eRisk.EPIManagement.SuccessfullyCreated");           
      });
  }

  updateEpi(id: number, epi: EpiSave): Observable<any>{
    
    return this.epiService.update(id, epi).do(() => {
        this.saveSuccess("eRisk.EPIManagement.SuccessfullyUpdated");
      },
      error => {
        if(error){          
          switch(error.status){
            case 404:
              this.translateService.get("eRisk.EPIManagement.NotFound", { id: id })
                .subscribe(message => this.toastrService.error(message));              
              break;
            default:
              break;
          }
        }
      });
  }

  private saveSuccess(messageTranslationKey: string)
  {
    this.translateService.get(messageTranslationKey)
      .subscribe(message => { 
        this.toastrService.success(message).onHidden.subscribe(() => 
          this.router.navigate(['/e-risk/master-data/epi']));            
      });
  }
}
