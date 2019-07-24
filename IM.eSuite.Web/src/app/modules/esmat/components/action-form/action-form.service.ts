import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { EsmatActionPlanService } from '../../services/esmat-action-plan.service';
import { ScheduleGet } from '../../models/schedule-get.model';
import { ActionViewModel } from '../../viewModels/action.viewModel';
import { ActionPlanSave } from '../../../eaction/models/action-plan-save.model';
import { mergeMap } from 'rxjs/operators';

@Injectable()
export class ActionFormService {

  constructor(private esmatActionPlanService: EsmatActionPlanService,
    private translateService: TranslateService, private toastrService: ToastrService, private router: Router) { }

  save(id: number, model: ActionViewModel, observationId: number, schedule: ScheduleGet): Observable<any>{    
    model = Object.assign(new ActionViewModel(), model);
    let action = model.toActionPlanSave();

    schedule = Object.assign(new ScheduleGet(), schedule);
    action.location = schedule.toLocationSave();
    action.sourceId = observationId;    
    return this.updateActionPlan(id, action);   
  }

  private updateActionPlan(id: number, action: ActionPlanSave): Observable<any>{
    return this.esmatActionPlanService.update(id, action)
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
    ).do(() => this.router.navigate(['/e-smat/history']));
  }
}