import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractDataService } from '@im-angular/core';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../../environments/environment';
import { SOA } from '../models/soa';

@Injectable()
export class SOAService extends AbstractDataService { 
  private readonly baseUrl = `${environment.eSuiteApi.endpoint}/api/soa`;
  
    constructor(private httpClient: HttpClient) {
      super();
    }
  
    /**
    * Search soa by name
    * Returns {Observable<SOA[]>}
    *@param {string} search
    *@param {number} businessUnitId
    */
    public search(search?: string, businessUnitId?: number): Observable<SOA[]> {
      let url = `${this.baseUrl}/search`;      
      let params = {
        search: search,
        businessUnitId: businessUnitId
      };
  
      let query = this.httpParamSerializer(params);
      return this.httpClient.get<SOA[]>(`${url}?${query}`);
    }
}