import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractDataService } from '@im-angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { SeverityList } from '../models/severity-list.model';
import { SeverityGet } from '../modules/master-data/models/severity-get.model';

@Injectable()
export class SeverityService extends AbstractDataService {
  private readonly baseUrl = `${environment.eRiskApi.endpoint}/api/severity`;

  constructor(private httpClient: HttpClient) {
    super();
  }

  /**
  * List Severities
  * Returns {Observable<Array<SeverityList>>}
  */
  list(): Observable<Array<SeverityList>> {
    let url = `${this.baseUrl}`;
    return this.httpClient.get<Array<SeverityList>>(`${url}`);
  }

  /**
  * Get by id
  * Returns {Observable<SeverityGet>}
  * @param {number} id
  */
  public get(id: number): Observable<SeverityGet> {
    let url = `${this.baseUrl}/${id}`;
    return this.httpClient.get<SeverityGet>(url);
  }
}
