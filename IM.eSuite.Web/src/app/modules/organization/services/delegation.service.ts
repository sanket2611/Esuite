import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractDataService } from '@im-angular/core';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../../environments/environment';
import { Delegation } from '../models/delegation';


@Injectable()
export class DelegationService extends AbstractDataService { 
  private readonly baseUrl = `${environment.eSuiteApi.endpoint}/api/delegation`;
  
    constructor(private httpClient: HttpClient) {
      super();
    }
  
    /**
    * Search delegation by name
    * Returns {Observable<Delegation[]>}
    *@param {string} search
    */
    public search(search?: string): Observable<Delegation[]> {
      let url = `${this.baseUrl}/search`;      
      let params = {
        search: search
      };
  
      let query = this.httpParamSerializer(params);
      return this.httpClient.get<Delegation[]>(`${url}?${query}`);
    }
}