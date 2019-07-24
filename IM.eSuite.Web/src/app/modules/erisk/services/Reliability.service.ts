import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractDataService } from '@im-angular/core';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../../environments/environment';
import { ReliabilityList } from '../models/reliability-list.model';

@Injectable()
export class ReliabilityService extends AbstractDataService{

  private readonly baseUrl = `${environment.eRiskApi.endpoint}/api/Reliability`;

  constructor(private httpClient: HttpClient) {
    super();
  }

  /**
  * List Reliabilities
  * Returns {Observable<ReliabilityList[]>} 
  */
  get(): Observable<ReliabilityList[]>{
    let url = `${this.baseUrl}`;
    return this.httpClient.get<ReliabilityList[]>(url);
  }

}