import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../../environments/environment';
import { ProbabilityList } from '../models/probability-list.model';

@Injectable()
export class ProbabilityService {
  private readonly baseUrl = `${environment.eRiskApi.endpoint}/api/probability`;
  
  constructor(private httpClient: HttpClient) {}

  /**
  * List probabilities
  * Returns {Observable<Array<ProbabilityList>>}    
  */
  list(): Observable<Array<ProbabilityList>>{
    let url = `${this.baseUrl}`;    
    return this.httpClient.get<Array<ProbabilityList>>(url);
  }
}