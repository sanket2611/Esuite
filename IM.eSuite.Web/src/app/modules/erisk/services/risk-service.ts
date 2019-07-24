import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractDataService, ListRequest, PagedList } from '@im-angular/core';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../../environments/environment';
import { RiskSave } from '../models/risk-save.model';
import { RiskGet } from '../models/risk-get.model';
import { RiskList } from '../models/risk-list.model';
import { LocationSave } from '../../eaction/models/location-save.model';
import { ImportResult } from '../../../models/importResult';

@Injectable()
export class RiskService extends AbstractDataService {
  private readonly baseUrl = `${environment.eRiskApi.endpoint}/api/risk`;

  constructor(private httpClient: HttpClient) {
    super();
  }

  /**
  * List Assessments
  * Returns {Observable<PageList<AssessmentList>>}
  * @param {ListRequest} request
  */
  list(request: ListRequest): Observable<PagedList<RiskList>> {
    let url = `${this.baseUrl}`;
    let query = this.httpParamSerializer(request);

    return this.httpClient.get<PagedList<RiskList>>(`${url}?${query}`);
  }

  /**
  * Get by id
  * Returns {Observable<RiskGet>}
  *@param {number} id
  */
  public get(id: number): Observable<RiskGet> {
    let url = `${this.baseUrl}/${id}`;
    return this.httpClient.get<RiskGet>(url);
  }

  /**
  * Creates a risk
  * Returns {Observable<number>}
  *@param {RiskSave} risk
  */
  public create(risk: RiskSave): Observable<RiskGet> {
    return this.httpClient.post<RiskGet>(this.baseUrl, risk);
  }

  /**
  * Updates a risk
  * Returns {Observable<number>}
  *@param {RiskSave} risk
  */
  public update(id: number, risk: RiskSave): Observable<any> {
    let url = `${this.baseUrl}/${id}`;
    return this.httpClient.put(url, risk);
  }

  /**
* Copy 
* Returns {Observable<any>}
*@param {LocationSave} destinationLocation
*@param {number[]} sourceRiskIds
*/
  public copy(destinationLocation: LocationSave, sourceRiskIds: number[]): Observable<any> {
    let url = `${this.baseUrl}/copy/?sourceRiskIds=${sourceRiskIds.join('&sourceRiskIds=')}`;
    return this.httpClient.post(url, destinationLocation);
  }

    /**
* Copy 
* Returns {Observable<any>}
*@param {number[]} ids
*/
public updateDate(ids: number[]): Observable<any> {
  let url = `${this.baseUrl}/evaluationdate`;
  return this.httpClient.put(url,ids );
}

  /**
  * Deletes a risk in batch
  * Returns {Observable}
  *@param {ids} number[]
  */
  public delete(ids: number[]): Observable<any> {
    let url = `${this.baseUrl}/?ids=${ids.join('&ids=')}`;
    return this.httpClient.delete<any>(url);
  }

  /**
  * Get file for an risk
  * Returns {Observable<any>}
  *@param {number} id
  */
  public getFile(id: number): Observable<any> {
    let url = `${this.baseUrl}/getFile/${id}`;
    return this.httpClient.get(url, { responseType: 'blob', observe: 'response' });
  }

  /**
  * Uploads a file for an risk
  * Returns {Observable}
  *@param {id} number
  *@param {data} FormData
  */
  public uploadFile(id: number, data: FormData): Observable<any> {
    let url = `${this.baseUrl}/uploadFile/${id}`;
    return this.httpClient.post(url, data);
  }

  /**
   * get export file
   * @param riskIds 
   */
  export(riskIds: number[]): Observable<any> {
    let url = `${this.baseUrl}/export/?riskIds=${riskIds.join('&riskIds=')}`;
    return this.httpClient.get(url, { responseType: 'blob', observe: 'response' });
  }

  /**
   * get import risks template file
   */
  template(): Observable<any> {
    let url = `${this.baseUrl}/template`;
    return this.httpClient.get(url, { responseType: 'blob', observe: 'response' });
  }


  /**
  * Import risks
  * Returns {Observable}
  *@param {data} FormData
  */
  public import(data: FormData): Observable<ImportResult> {
    let url = `${this.baseUrl}/import`;
    return this.httpClient.post<ImportResult>(url, data);
  }

}
