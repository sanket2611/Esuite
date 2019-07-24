import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { ObservationCategoryService } from '../../../../services/observation-category.service';
import { ObservationCategorySave } from '../../../../models/observation-category-save.model';
import { ObservationCategoryGet } from '../../../../models/observation-category-get.model';

@Injectable()
export class ObservationCategoryFormService {

  constructor(private observationCategoryService: ObservationCategoryService, private translateService: TranslateService,
    private toastrService: ToastrService, private router: Router) { }
  
  createObservationCategory(observationCategory: ObservationCategorySave): Observable<ObservationCategoryGet>{
    return this.observationCategoryService.create(observationCategory).do(
      result => {
        this.saveSuccess("eSMAT.ObservationManagement.SuccessfullyCreated");           
      });
  }

  updateObservationCategory(id: number, observationCategory: ObservationCategorySave): Observable<any>{
    
    return this.observationCategoryService.update(id, observationCategory).do(result => {
        this.saveSuccess("eSMAT.ObservationManagement.SuccessfullyUpdated");
      },
      error => {
        if(error){          
          switch(error.status){
            case 404:
              this.translateService.get("eSMAT.ObservationManagement.NotFound", { id: id })
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
          this.router.navigate(['/e-smat/master-data/observation']));            
      });
  }
}
