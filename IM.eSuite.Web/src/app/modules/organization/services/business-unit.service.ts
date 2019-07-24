import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractDataService } from '@im-angular/core';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../../environments/environment';
import { BusinessUnit } from '../models/businessUnit';

@Injectable()
export class BusinessUnitService extends AbstractDataService { 
  private readonly baseUrl = `${environment.eSuiteApi.endpoint}/api/businessunit`;
  
    constructor(private httpClient: HttpClient) {
      super();
    }
  
    /**
    * Search business unit by name
    * Returns {Observable<BusinessUnit[]>}
    *@param {string} search
    *@param {number} sectorId
    */
    public search(search?: string, sectorId?: number): Observable<BusinessUnit[]> {
      let url = `${this.baseUrl}/search`;      
      let params = {
        search: search,
        sectorId: sectorId
      };
  
      let query = this.httpParamSerializer(params);
      return this.httpClient.get<BusinessUnit[]>(`${url}?${query}`);
    }
}