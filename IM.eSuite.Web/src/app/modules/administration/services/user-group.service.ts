import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { PagedList, SortViewModel } from '@im-angular/core';
import { environment } from '../../../../environments/environment';

import { ApplicationViewModel } from '../viewModels/application.viewModel';

@Injectable()
export class UserGroupService {

  private readonly baseUrl = `${environment.eSuiteApi.endpoint}/api/usergroup`;

  constructor(private httpClient: HttpClient) {}  
  
    /**
    * List user groups by application
    * Returns {Observable<PageList<ApplicationViewModel>>}    
    */
    public getByApplication(): Observable<PagedList<ApplicationViewModel>> {
      let url = `${this.baseUrl}/getByApplication`;
      return this.httpClient.get<PagedList<ApplicationViewModel>>(url);
    }
}