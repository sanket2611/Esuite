import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../../environments/environment';
import { AbstractDataService, PagedList } from '@im-angular/core';
import { ScheduleListRequest } from '../models/schedule-list-request.model';
import { ScheduleList } from '../models/schedule-list.model';
import { ScheduleSave } from '../models/schedule-save.model';
import { ScheduleGet } from '../models/schedule-get.model';
import { ImportResult } from '../../../models/importResult';

@Injectable()
export class ScheduleService extends AbstractDataService {
  private readonly baseUrl = `${environment.eSmatApi.endpoint}/api/schedule`;
  
  constructor(private httpClient: HttpClient) { 
    super();
  }

  /**
  * List schedules
  * Returns {Observable<PageList<ScheduleList>>}
  *@param {ScheduleListRequest} request    
  */
  public list(request: ScheduleListRequest): Observable<PagedList<ScheduleList>> {
    let url = `${this.baseUrl}/get`;
    let query = this.httpParamSerializer(request);
    return this.httpClient.get<PagedList<ScheduleList>>(`${url}?${query}`);
  }

  /**
  * Get by id
  * Returns {Observable<SmatReceiver>}
  *@param {number} id
  */
  public get(id: number): Observable<ScheduleGet>{    
    let url = `${this.baseUrl}/${id}`;
    return this.httpClient.get<ScheduleGet>(url);
  }

  /**
  * Creates a schedule
  * Returns {Observable<number>}
  *@param {ScheduleSave} schedule
  */
  public create(schedule: ScheduleSave) : Observable<number> {
    return this.httpClient.post<number>(this.baseUrl, schedule);
  }

  /**
  * Updates a schedule
  * Returns {Observable<number>}
  *@param {ScheduleSave} schedule
  */
  public update(schedule: ScheduleSave) : Observable<any> {
    return this.httpClient.put(this.baseUrl, schedule);
  }

  /**
  * Deletes a schedule
  * Returns {Observable}
  *@param {id} number
  */
  public delete(id: number): Observable<any> {
    let url = `${this.baseUrl}/${id}`;
    return this.httpClient.delete(url);
  }

  /**
  * Import schedules
  * Returns {Observable}
  *@param {data} FormData
  */
  public import(data: FormData): Observable<ImportResult> {
    let url = `${this.baseUrl}/import`;
    return this.httpClient.post<ImportResult>(url, data);
  }

  /**
  * Exports schedules in excel format
  * Returns {Observable<any>}
  *@param {number} plantId
  */
  public export(plantId?: number): Observable<any>{    
    let url = `${this.baseUrl}/export`;
    if(plantId){
      url += `?plantId=${plantId}`;
    }
    return this.httpClient.get(url, { responseType: 'blob', observe: 'response'});
  }
}