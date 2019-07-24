import { Injectable } from '@angular/core';
import { AbstractDataService, PagedList } from '@im-angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../../environments/environment';
import { ObservationSubCategoryListRequest } from '../models/observation-sub-category-list-request.model';
import { ObservationSubCategoryList } from '../models/observation-sub-category-list.model';
import { ObservationSubCategorySave } from '../models/observation-sub-category-save.model';
import { ObservationSubCategoryGet } from '../models/observation-sub-category-get.model';

@Injectable()
export class ObservationSubCategoryService extends AbstractDataService{
  private readonly baseUrl = `${environment.eSmatApi.endpoint}/api/observationSubCategory`;
  
  constructor(private httpClient: HttpClient) { 
    super();
  }

  /**
  * List observation sub categories
  * Returns {Observable<PageList<ObservationSubCategoryList>>}
  *@param {ObservationSubCategoryListRequest} request    
  */
  list(request: ObservationSubCategoryListRequest): Observable<PagedList<ObservationSubCategoryList>>{
    let url = `${this.baseUrl}/get`;
    let query = this.httpParamSerializer(request);
    return this.httpClient.get<PagedList<ObservationSubCategoryList>>(`${url}?${query}`);
  }

  /**
  * Get by id
  * Returns {Observable<ObservationSubCategoryGet>}
  *@param {number} id
  *@param {number} plantId
  */
  public get(id: number, plantId: number): Observable<ObservationSubCategoryGet>{    
    let url = `${this.baseUrl}/${id}/${plantId}`;
    return this.httpClient.get<ObservationSubCategoryGet>(url);
  }

  /**
  * Creates an observation sub category
  * Returns {Observable<ObservationCategorySave>}
  *@param {ObservationSubCategorySave} observationSubCategory
  */
  public create(observationSubCategory: ObservationSubCategorySave) : Observable<ObservationSubCategoryGet> {
    return this.httpClient.post<ObservationSubCategoryGet>(this.baseUrl, observationSubCategory);
  }

  /**
  * Updates a observation category
  * Returns {Observable<any>}
  *@param {number} id
  *@param {ObservationSubCategorySave} observationSubCategory
  */
  public update(id: number, observationSubCategory: ObservationSubCategorySave) : Observable<any> {
    return this.httpClient.put(`${this.baseUrl}/${id}`, observationSubCategory);
  }

  /**
  * Deletes an observation sub category
  * Returns {Observable<any>}
  *@param {number} id  
  */
  public delete(id: number) : Observable<any> {
    let url = `${this.baseUrl}/${id}`;
    return this.httpClient.delete(url);
  }
}