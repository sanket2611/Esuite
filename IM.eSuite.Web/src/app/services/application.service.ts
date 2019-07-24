import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { Application } from '../models/application';

@Injectable()
export class ApplicationService {
  private readonly baseUrl = `${environment.eSuiteApi.endpoint}/api/application`;

  constructor(private httpClient: HttpClient) { }

  /**
    * List applications
    * Returns {Observable<Array<Application>>}
    */
    public list(): Observable<Array<Application>> {
      let url = `${this.baseUrl}/get`;
      return this.httpClient.get<Array<Application>>(url);
    }
}
