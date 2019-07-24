import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { PagedList, SortViewModel, AbstractDataService } from '@im-angular/core';
import { ApplicationUser } from '../models/applicationUser';

import { environment } from '../../../../environments/environment';
import { ImportResult } from '../../../models/importResult';

@Injectable()
export class UserService extends AbstractDataService {
  private readonly baseUrl = `${environment.eSuiteApi.endpoint}/api/user`;

  constructor(private httpClient: HttpClient) {
    super();
  }  

  /**
  * List users
  * Returns {Observable<PageList<ApplicationUser>>}
  *@param {number} pageNumber
  *@param {number} pageSize
  *@param {SortViewModel} sort
  */
  public list(pageNumber?: number, pageSize?: number, sort?: SortViewModel): Observable<PagedList<ApplicationUser>> {
    let url = `${this.baseUrl}/get`;

    if(pageNumber && pageSize){
      url += `/${pageNumber}/${pageSize}`;
    }

    if (sort && sort.sortBy){
      url +=`/${sort.sortBy}/${sort.isDescending}`;
    }
    return this.httpClient.get<PagedList<ApplicationUser>>(url);
  }

  /**
  * Search user by first name, last name and SGID
  * Returns {Observable<ApplicationUser[]>}
  *@param {string} search
  *@param {number} plantId
  *@param {roleName} roleName
  */
  public search(search?: string, plantId?: number, roleName?: string): Observable<ApplicationUser[]> {
    let request = { search: search, plantId: plantId, roleName: roleName };
    let query = this.httpParamSerializer(request);
    let url = `${this.baseUrl}/search?${query}`;    
    return this.httpClient.get<ApplicationUser[]>(url);
  }

  /**
  * Get by id
  * Returns {Observable<ApplicationUser>}
  *@param {number} id
  */
  public get(id: number): Observable<ApplicationUser> {
    let url = `${this.baseUrl}/${id}`;
    return this.httpClient.get<ApplicationUser>(url);
  }

  /**
  * Creates a user
  * Returns {Observable<number>}
  *@param {ApplicationUser} user
  */
  public create(user: ApplicationUser) : Observable<number> {
    return this.httpClient.post<number>(this.baseUrl, user);
  }

  /**
  * Updates a user
  * Returns {Observable}
  *@param {ApplicationUser} user
  */
  public update(user: ApplicationUser) : Observable<any> {
    return this.httpClient.put(this.baseUrl, user);
  }

  /**
  * Deletes a user
  * Returns {Observable}
  *@param {id} number
  */
  public delete(id: number): Observable<any> {
    let url = `${this.baseUrl}/${id}`;
    return this.httpClient.delete(url);
  }

  /**
  * Import users
  * Returns {Observable}
  *@param {data} FormData
  */
  public import(data: FormData): Observable<ImportResult> {
    let url = `${this.baseUrl}/import`;
    return this.httpClient.post<ImportResult>(url, data);
  }
}
