import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { PagedList, SortViewModel, AbstractDataService } from '@im-angular/core';

import { environment } from '../../../../environments/environment';
import { Organization } from '../models/organization';
import { OrganizationListRequest } from '../models/organizationListRequest';
import { ImportResult } from '../../../models/importResult';

@Injectable()
export class OrganizationService extends AbstractDataService {
  private readonly baseUrl = `${environment.eSuiteApi.endpoint}/api/organization`;
  
  constructor(private httpClient: HttpClient) {
    super();
  }  

  /**
  * List organizations
  * Returns {Observable<PageList<Organization>>}
  *@param {OrganizationListRequest} request    
  */
  public list(request: OrganizationListRequest): Observable<PagedList<Organization>> {
    let url = `${this.baseUrl}/get`;
    let query = this.httpParamSerializer(request);      
    return this.httpClient.get<PagedList<Organization>>(`${url}?${query}`);
  }

  /**
  * Search organization by name, cif and parent organization id
  * Returns {Observable<Organization[]>}
  *@param {string} search
  *@param {number} parentId
  */
  public search(search?: string, parentId?: number, plantId?: number): Observable<Organization[]> {
    let url = `${this.baseUrl}/search`;      
    let params = {
      search:search,
      parentId: parentId,
      plantId: plantId
    };

    let query = this.httpParamSerializer(params);
    return this.httpClient.get<Organization[]>(`${url}?${query}`);
  }

  /**
  * Get by id
  * Returns {Observable<Organization>}
  *@param {number} id
  */
  public get(id: number): Observable<Organization> {
    let url = `${this.baseUrl}/${id}`;
    return this.httpClient.get<Organization>(url);
  }

  /**
  * Creates an organization
  * Returns {Observable<number>}
  *@param {Organization} organization
  */
  public create(organization: Organization) : Observable<Organization> {
    return this.httpClient.post<Organization>(this.baseUrl, organization);
  }

  /**
  * Updates an organization
  * Returns {Observable}
  *@param {Organization} organization
  */
  public update(organization: Organization) : Observable<any> {
    return this.httpClient.put(this.baseUrl, organization);
  }

  /**
  * Deletes an organization
  * Returns {Observable}
  *@param {id} number
  */
  public delete(id: number): Observable<any> {
    let url = `${this.baseUrl}/${id}`;
    return this.httpClient.delete(url);
  }

  /**
  * Import organizations
  * Returns {Observable}
  *@param {data} FormData
  */
  public import(data: FormData): Observable<ImportResult> {
    let url = `${this.baseUrl}/import`;
    return this.httpClient.post<ImportResult>(url, data);
  }
}
