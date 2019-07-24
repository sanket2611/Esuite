import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractDataService } from '@im-angular/core';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../../environments/environment';
import { Sector } from '../models/sector';


@Injectable()
export class SectorService extends AbstractDataService { 
  private readonly baseUrl = `${environment.eSuiteApi.endpoint}/api/sector`;
  
    constructor(private httpClient: HttpClient) {
      super();
    }
  
    /**
    * Search sector by name
    * Returns {Observable<Sector[]>}
    *@param {string} search
    */
    public search(search?: string): Observable<Sector[]> {
      let url = `${this.baseUrl}/search`;      
      let params = {
        search: search
      };
  
      let query = this.httpParamSerializer(params);
      return this.httpClient.get<Sector[]>(`${url}?${query}`);
    }
}