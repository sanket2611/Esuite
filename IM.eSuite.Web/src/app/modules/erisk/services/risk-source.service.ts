import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractDataService } from '@im-angular/core';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../../environments/environment';
import { RiskSourceList } from '../models/risk-source-list.model';

@Injectable()
export class RiskSourceService extends AbstractDataService{

  private readonly baseUrl = `${environment.eRiskApi.endpoint}/api/RiskSource`;

  constructor(private httpClient: HttpClient) {
    super();
  }

  /**
  * List riskSources
  * Returns {Observable<RiskSourceList[]>} 
  */
  get(): Observable<RiskSourceList[]>{
    let url = `${this.baseUrl}`;
    return this.httpClient.get<RiskSourceList[]>(url);
  }

}