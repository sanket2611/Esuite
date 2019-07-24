import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { ActionPlanService } from '../../services/action-plan.service';
import { ActionPlanSave } from '../../models/action-plan-save.model';
import { ActionPlanViewModel } from '../../viewModels/action-plan.viewModel';
import { mergeMap } from 'rxjs/operators';
import { environment } from '../../../../../environments/environment';
import { ActionPlanGet } from '../../models/action-plan-get.model';

@Injectable()
export class ActionFormService {

  constructor(private actionPlanService: ActionPlanService,
    private translateService: TranslateService, private toastrService: ToastrService, private router: Router) { }

  save(id: number, model: ActionPlanViewModel): Observable<any>{    
    model = Object.assign(new ActionPlanViewModel(), model);
    let action = model.toActionPlanSave();    
    
    return id ? this.updateActionPlan(id, action)
      : this.createActionPlan(action);
  }

  private createActionPlan(action: ActionPlanSave): Observable<ActionPlanGet>{
    return this.actionPlanService.create(environment.eActionApi.keyId.eAction, action)
      .pipe(        
        mergeMap(() => this.saveSuccess("eAction.SuccessfullyCreated"))
      );
  }

  private updateActionPlan(id: number, action: ActionPlanSave): Observable<any>{
    return this.actionPlanService.update(environment.eActionApi.keyId.eAction, id, action)
      .catch(error => {
        switch(error.status){
          case 404:
            this.translateService.get("eAction.NotFound", { id: id })
              .subscribe(message => this.toastrService.error(message));              
            break;
          default:
            break;
        }
        return Observable.throw(error);
      }).pipe(        
        mergeMap(() => this.saveSuccess("eAction.SuccessfullyUpdated"))
      );
  }

  private saveSuccess(messageTranslationKey: string): Observable<any>
  {
    return this.translateService.get(messageTranslationKey).pipe(
      mergeMap((message) => this.toastrService.success(message).onHidden)      
    ).do(() => this.router.navigate(['/e-action']));
  }
}
