import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractDataService, ListRequest, PagedList } from '@im-angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { ConsolidationList } from '../models/consolidation-list.model';

@Injectable()
export class ConsolidationService extends AbstractDataService {
  private readonly baseUrl = `${environment.eRiskApi.endpoint}/api/consolidation`;

  constructor(private httpClient: HttpClient) {
    super();
  }

  /**
  * List consolidations
  * Returns {Observable<PageList<consolidationList>>}
  * @param {ListRequest} request
  */
  list(request: ListRequest): Observable<PagedList<ConsolidationList>> {
    let url = `${this.baseUrl}`;
    let query = this.httpParamSerializer(request);
    return this.httpClient.get<PagedList<ConsolidationList>>(`${url}?${query}`);
  }
}
