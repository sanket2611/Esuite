import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractDataService } from '@im-angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SafetySheetService extends AbstractDataService {
  private readonly baseUrl = `${environment.eRiskApi.endpoint}/api/safetySheet`;

  constructor(private httpClient: HttpClient) {
    super();
  }

  /**
  * Get saftey sheet
  * Returns {Observable<any>} saftey sheet in PDF format
  * @param {ListRequest} request
  */
  get(id: number): Observable<any> {
    let url = `${this.baseUrl}?id=${id}`;
    return this.httpClient.get(url, { responseType: 'blob', observe: 'response'});
  }
}