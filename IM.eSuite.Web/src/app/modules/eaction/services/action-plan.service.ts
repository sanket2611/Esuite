import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../../environments/environment';
import { PagedList, AbstractDataService } from '@im-angular/core';
import { ActionPlanSave } from '../models/action-plan-save.model';
import { ActionPlanGet } from '../models/action-plan-get.model';
import { ActionPlanList } from '../models/action-plan-list.model';
import { ActionPlanListRequest } from '../models/action-plan-list-request.model';
import { SourceEnum } from '../enums/source.enum';

@Injectable()
export class ActionPlanService extends AbstractDataService {
  private readonly baseUrl = `${environment.eActionApi.endpoint}/api/ActionPlan`;
  
  constructor(private httpClient: HttpClient) { 
    super();
  }

  /**
  * List action plans
  * Returns {Observable<PageList<ActionPlanList>>}
  * @param {string} keyId
  * @param {ActionPlanListRequest} request    
  */
  public list(keyId: string, request: ActionPlanListRequest): Observable<PagedList<ActionPlanList>> {
    let query = this.httpParamSerializer(request);
    return this.httpClient.get<PagedList<ActionPlanList>>(`${this.baseUrl}?${query}&keyId=${keyId}`);
  }
  /**
  * Get by id
  * Returns {Observable<ActionPlanGet>}
  *@param {string} keyId
  *@param {number} id
  */
  public get(keyId: string, id: number): Observable<ActionPlanGet>{    
    let url = `${this.baseUrl}/${id}?keyId=${keyId}`;
    return this.httpClient.get<ActionPlanGet>(url);
  }

  /**
  * Creates an action plan
  * Returns {Observable<ActionPlanSave>}
  *@param {string} keyId
  *@param {ActionPlanSave} action
  */
  public create(keyId: string, action: ActionPlanSave) : Observable<ActionPlanGet> {
    let url = `${this.baseUrl}?keyId=${keyId}`;
    return this.httpClient.post<ActionPlanGet>(url, action);
  }

  /**
  * Updates an action plan
  * Returns {Observable<any>}
  *@param {string} keyId
  *@param {number} id
  *@param {ActionPlanSave} action
  */
  public update(keyId: string, id: number, action: ActionPlanSave) : Observable<any> {
    let url = `${this.baseUrl}/${id}?keyId=${keyId}`;
    return this.httpClient.put(url, action);
  }

  /**
  * Deletes an action plan
  * Returns {Observable<any>}
  *@param {string} keyId
  *@param {number} id  
  */
  public delete(keyId: string, id: number) : Observable<any> {
    let url = `${this.baseUrl}/${id}?keyId=${keyId}`;
    return this.httpClient.delete(url);
  }

 /**
  * Exports action plans in excel format
  * Returns {Observable<any>}
  *@param {number} plantId
  */
 public export(keyId: string, plantId?: number, source?: SourceEnum, search?: string): Observable<any>{
    let url = `${this.baseUrl}/export?keyId=${keyId}`;
    let request: any = {};

    if (plantId) {
      request.plantId = plantId;
    }
    if (source) {
      request.source = source;
    }
    if (search) {
      request.search = search;
    }

    if (request) {
      url += `&${this.httpParamSerializer(request)}`;
    }

    return this.httpClient.get(url, { responseType: 'blob', observe: 'response'});
  }
}