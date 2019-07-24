import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../../environments/environment';
import { ObservationSummary } from '../models/observation-summary';
import { ObservationSave } from '../models/observation-save.model';

@Injectable()
export class ObservationService  {
  private readonly baseUrl = `${environment.eSmatApi.endpoint}/api/observation`;

  constructor(private httpClient: HttpClient) {}

  /**
  * Get observation by id
  * Returns {Observable<ObservationGet>}
  *@param {number} id
  */
  public get(id: number): Observable<ObservationSummary> {
    let url = `${this.baseUrl}/${id}`;
    return this.httpClient.get<ObservationSummary>(url);
  }

  /**
  * Get observation by id
  * Returns {Observable<ObservationGet>}
  *@param {number} id
  */
  public update(id: number, observation: ObservationSave): Observable<any> {
    let url = `${this.baseUrl}/${id}`;
    return this.httpClient.put(url, observation);
  }

  /**
  * Get image for an observation
  * Returns {Observable<any>}
  *@param {number} id
  */
  public getImage(id: number): Observable<any>{    
    let url = `${this.baseUrl}/getImage/${id}`;
    return this.httpClient.get(url, { responseType: 'blob', observe: 'response'});
  }

  /**
  * Uploads an image for an observation
  * Returns {Observable}
  *@param {id} number
  *@param {data} FormData
  */
  public uploadImage(id: number, data: FormData): Observable<any> {    
    let url = `${this.baseUrl}/uploadImage/${id}`;
    return this.httpClient.post(url, data);
  }  
}