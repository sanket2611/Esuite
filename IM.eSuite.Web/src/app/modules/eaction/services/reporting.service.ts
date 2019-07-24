import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractDataService } from '@im-angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { ReportingRequest } from '../../../models/reporting-request.model';
import { ActionByStatusGet } from '../models/action-by-status-get';

@Injectable()
export class ReportingService extends AbstractDataService {
  private readonly baseUrl = `${environment.eActionApi.endpoint}/api/Reporting`;

  constructor(private httpClient: HttpClient) { 
    super();
  }

  /**
  * Get actions by status
  * Returns {Observable<ActionByStatusGet[]>}
  * @param {string} keyId
  * @param {ReportingRequest} request    
  */
  getActionPlanByStatus(request: ReportingRequest, keyId: string): Observable<ActionByStatusGet[]>{
    let url = `${this.baseUrl}/actionPlanByStatus`;
    let query = this.httpParamSerializer(request);
    return this.httpClient.get<ActionByStatusGet[]>(`${url}?${query}&keyId=${keyId}`);
  }
}