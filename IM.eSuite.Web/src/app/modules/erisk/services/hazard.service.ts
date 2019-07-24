import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractDataService, PagedList } from '@im-angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { HazardList } from '../models/hazard-list.model';
import { HazardGet } from '../modules/master-data/models/hazard-get.model';
import { HazardSave } from '../modules/master-data/models/hazard-save.model';
import { HazardListRequest } from '../models/hazard-list-request';


@Injectable()
export class HazardService extends AbstractDataService {
  private readonly baseUrl = `${environment.eRiskApi.endpoint}/api/hazard`;

  constructor(private httpClient: HttpClient) {
    super();
  }

  /**
  * List hazards
  * Returns {Observable<PageList<HazardList>>}
  *@param {HazardListRequest} request    
  */
  list(request: HazardListRequest): Observable<PagedList<HazardList>> {
    let url = `${this.baseUrl}`;
    let query = this.httpParamSerializer(request);
    return this.httpClient.get<PagedList<HazardList>>(`${url}?${query}`);
  }


  /**
  * Get by id
  * Returns {Observable<HazardGet>}
  *@param {number} id
  */
  public get(id: number): Observable<HazardGet> {
    let url = `${this.baseUrl}/${id}`;
    return this.httpClient.get<HazardGet>(url);
  }

  /**
  * Creates a hazard
  * Returns {Observable<HazardGet>}
  *@param {HazardSave} hazard
  */
  public create(hazard: HazardSave): Observable<HazardGet> {
    return this.httpClient.post<HazardGet>(this.baseUrl, hazard);
  }

  /**
  * Updates a hazard
  * Returns {Observable<any>}
  *@param {number} id
  *@param {HazardSave} hazard
  */
  public update(id: number, hazard: HazardSave): Observable<any> {
    return this.httpClient.put(`${this.baseUrl}/${id}`, hazard);
  }

  /**
  * Deletes a hazard
  * Returns {Observable<any>}
  *@param {number} id  
  */
  public delete(id: number): Observable<any> {
    let url = `${this.baseUrl}/${id}`;
    return this.httpClient.delete(url);
  }
}