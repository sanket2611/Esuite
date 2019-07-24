import { Injectable } from '@angular/core';
import { ActionPlanService } from '../../eaction/services/action-plan.service';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { ActionPlanGet } from '../../eaction/models/action-plan-get.model';
import { ActionPlanSave } from '../../eaction/models/action-plan-save.model';

@Injectable()
export class EsmatActionPlanService {
  private readonly keyId = environment.eActionApi.keyId.eSmat;

  constructor(private actionPlanService: ActionPlanService) { }

  /**
  * Get by id
  * Returns {Observable<ActionPlanGet>}
  *@param {number} id
  */
  public get(id: number): Observable<ActionPlanGet>{    
    return this.actionPlanService.get(this.keyId, id);
  }

  /**
  * Creates an action plan
  * Returns {Observable<ActionPlanSave>}
  *@param {ActionPlanSave} action
  */
  public create(action: ActionPlanSave) : Observable<ActionPlanGet> {
    return this.actionPlanService.create(this.keyId, action);
  }

  /**
  * Updates an action plan
  * Returns {Observable<any>}
  *@param {number} id
  *@param {ActionPlanSave} action
  */
  public update(id: number, action: ActionPlanSave) : Observable<any> {
    return this.actionPlanService.update(this.keyId, id, action);
  }

  /**
  * Deletes an observation category
  * Returns {Observable<any>}
  *@param {number} id  
  */
  public delete(id: number) : Observable<any> {
    return this.actionPlanService.delete(this.keyId, id);
  }
}