import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { environment } from '../../../../environments/environment';
import { Person } from '../models/person';
import { ApplicationUser } from '../models/applicationUser';

@Injectable()
export class DirectoryService {

  private readonly baseUrl = `${environment.eSuiteApi.endpoint}/api/directory`;

  constructor(private httpClient: HttpClient) {}

  /**
  * Get person by sgid
  * Returns {Observable<Person>}
  *@param {string} sgid
  */
  public getBySgId(sgid: string): Observable<ApplicationUser> {
    if(!sgid)
    {
      return;
    }
    
    let url = `${this.baseUrl}/getUserBySGId/${sgid}`;
    return this.httpClient.get<Person>(url).map(person => {        
      return ApplicationUser.getFromPerson(person);
    });    
  }

  /**
  * Get emails by name
  * Returns {Observable<string[]>}
  *@param {string} name
  */
  public getEmailByName(name: string): Observable<string[]> {
    if(!name)
    {
      return;
    }
    
    let url = `${this.baseUrl}/getEmailByName/${name}`;
    return this.httpClient.get<string[]>(url);    
  }
}