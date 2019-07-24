import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractDataService, PagedList } from '@im-angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { FrequencyList } from '../models/frequency-list';

@Injectable()
export class FrequencyService extends AbstractDataService {
  private readonly baseUrl = `${environment.eRiskApi.endpoint}/api/frequency`;

  constructor(private httpClient: HttpClient) {
    super();
  }

  /**
  * List Frequencies
  * Returns {Observable<Array<FrequencyList>>}
  * @param {FrequencyListRequest} request
  */
  list(): Observable<Array<FrequencyList>> {
    let url = `${this.baseUrl}`;
    return this.httpClient.get<Array<FrequencyList>>(`${url}`);
  }
}
