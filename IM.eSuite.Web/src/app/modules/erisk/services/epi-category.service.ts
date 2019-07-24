import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractDataService, PagedList } from '@im-angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { EpiCategoryList } from '../models/epi-category-list.model';
import { EpiCategoryGet } from '../modules/master-data/models/epi-category-get.model';

@Injectable()
export class EpiCategoryService extends AbstractDataService{
  private readonly baseUrl = `${environment.eRiskApi.endpoint}/api/epiCategory`;
  
  constructor(private httpClient: HttpClient) { 
    super();
  }

  /**
  * List epi categories
  * Returns {Observable<Array<EpiCategoryList>>}
  */
  list(): Observable<Array<EpiCategoryList>>{
    let url = `${this.baseUrl}`;
    return this.httpClient.get<Array<EpiCategoryList>>(url);
  }

  /**
  * Get by id
  * Returns {Observable<EpiGet>}
  *@param {number} id
  */
  public get(id: number): Observable<EpiCategoryGet> {
    let url = `${this.baseUrl}/${id}`;
    return this.httpClient.get<EpiCategoryGet>(url);
  }

}