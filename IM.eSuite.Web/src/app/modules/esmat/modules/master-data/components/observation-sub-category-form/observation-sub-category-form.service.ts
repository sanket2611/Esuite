import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { ObservationSubCategoryService } from '../../../../services/observation-sub-category.service';
import { ObservationSubCategorySave } from '../../../../models/observation-sub-category-save.model';
import { ObservationSubCategoryGet } from '../../../../models/observation-sub-category-get.model';

@Injectable()
export class ObservationSubCategoryFormService {

  constructor(private observationSubCategoryService: ObservationSubCategoryService, private translateService: TranslateService,
    private toastrService: ToastrService, private router: Router) { }
  
  createObservationSubCategory(observationSubCategory: ObservationSubCategorySave): Observable<ObservationSubCategoryGet>{
    return this.observationSubCategoryService.create(observationSubCategory).do(
      result => {
        this.saveSuccess("eSMAT.ObservationManagement.SuccessfullyCreated");           
      });
  }

  updateObservationSubCategory(id: number, observationSubCategory: ObservationSubCategorySave): Observable<any>{
    
    return this.observationSubCategoryService.update(id, observationSubCategory).do(result => {
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