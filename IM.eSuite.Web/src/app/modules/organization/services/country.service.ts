import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractDataService } from '@im-angular/core';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../../environments/environment';
import { Country } from '../models/country';


@Injectable()
export class CountryService extends AbstractDataService { 
  private readonly baseUrl = `${environment.eSuiteApi.endpoint}/api/country`;
  
    constructor(private httpClient: HttpClient) {
      super();
    }
  
    /**
    * Search country by name
    * Returns {Observable<Country[]>}
    *@param {string} search
    *@param {number} delegationId
    */
    public search(search?: string, delegationId?: number): Observable<Country[]> {
      let url = `${this.baseUrl}/search`;      
      let params = {
        search: search,
        delegationId: delegationId
      };
  
      let query = this.httpParamSerializer(params);
      return this.httpClient.get<Country[]>(`${url}?${query}`);
    }
}