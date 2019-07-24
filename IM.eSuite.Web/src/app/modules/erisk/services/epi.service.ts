import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractDataService, PagedList } from '@im-angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { EpiListRequest } from '../models/epi-list-request.model';
import { EpiList } from '../models/epi-list.model';
import { EpiGet } from '../modules/master-data/models/epi-get.model';
import { EpiSave } from '../modules/master-data/models/epi-save.model';

@Injectable()
export class EpiService extends AbstractDataService{
  private readonly baseUrl = `${environment.eRiskApi.endpoint}/api/epi`;
  
  constructor(private httpClient: HttpClient) { 
    super();
  }

  /**
  * List epi
  * Returns {Observable<PageList<EpiList>>}
  *@param {EpiListRequest} request    
  */
  list(request: EpiListRequest): Observable<PagedList<EpiList>>{
    let url = `${this.baseUrl}`;
    let query = this.httpParamSerializer(request);
    let response =  this.httpClient.get<PagedList<EpiList>>(`${url}?${query}`);
    return response;
  }


  /**
  * Get by id
  * Returns {Observable<EpiGet>}
  *@param {number} id
  */
  public get(id: number): Observable<EpiGet> {
    let url = `${this.baseUrl}/${id}`;
    return this.httpClient.get<EpiGet>(url);
  }

  /**
  * Creates a epi
  * Returns {Observable<EpiGet>}
  *@param {EpiSave} epi
  */
  public create(epi: EpiSave) : Observable<EpiGet> {
    return this.httpClient.post<EpiGet>(this.baseUrl, epi);
  }

  /**
  * Updates a epi
  * Returns {Observable<any>}
  *@param {number} id
  *@param {EpiSave} epi
  */
  public update(id: number, epi: EpiSave) : Observable<any> {
    return this.httpClient.put(`${this.baseUrl}/${id}`, epi);
  }

  /**
  * Deletes a epi
  * Returns {Observable<any>}
  *@param {number} id  
  */
  public delete(id: number) : Observable<any> {
    let url = `${this.baseUrl}/${id}`;
    return this.httpClient.delete(url);
  }
}