import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { PagedList, AbstractDataService } from '@im-angular/core';
import { environment } from '../../../../environments/environment';
import { ObservationCategoryListRequest } from '../models/observation-category-list-request.model';
import { ObservationCategoryList } from '../models/observation-category-list.model';
import { ObservationCategoryGet } from '../models/observation-category-get.model';
import { ObservationCategorySave } from '../models/observation-category-save.model';

@Injectable()
export class ObservationCategoryService extends AbstractDataService {
  private readonly baseUrl = `${environment.eSmatApi.endpoint}/api/observationCategory`;
  
  constructor(private httpClient: HttpClient) { 
    super();
  }

  /**
  * List observation categories
  * Returns {Observable<PageList<ObservationCategoryList>>}
  *@param {ObservationCategoryListRequest} request    
  */
  list(request: ObservationCategoryListRequest): Observable<PagedList<ObservationCategoryList>>{
    let url = `${this.baseUrl}/get`;
    let query = this.httpParamSerializer(request);
    return this.httpClient.get<PagedList<ObservationCategoryList>>(`${url}?${query}`);
  }

  /**
  * Get by id
  * Returns {Observable<ObservationCategoryGet>}
  *@param {number} id
  */
  public get(id: number): Observable<ObservationCategoryGet>{    
    let url = `${this.baseUrl}/${id}`;
    return this.httpClient.get<ObservationCategoryGet>(url);
  }

  /**
  * Get observation categories by plant id
  * Returns {Observable<ObservationCategoryList[]>}
  *@param {number} plantId    
  */
  getByPlantId(plantId: number): Observable<ObservationCategoryList[]>{
    let url = `${this.baseUrl}/getByPlantId/${plantId}`;
    return this.httpClient.get<ObservationCategoryList[]>(url);
  }

  /**
  * Creates an observation category
  * Returns {Observable<ObservationCategoryGet>}
  *@param {ObservationCategorySave} observationCategory
  */
  public create(observationCategory: ObservationCategorySave) : Observable<ObservationCategoryGet> {
    return this.httpClient.post<ObservationCategoryGet>(this.baseUrl, observationCategory);
  }

  /**
  * Updates a observation category
  * Returns {Observable<any>}
  *@param {number} id
  *@param {ObservationCategorySave} observationCategory
  */
  public update(id: number, observationCategory: ObservationCategorySave) : Observable<any> {
    return this.httpClient.put(`${this.baseUrl}/${id}`, observationCategory);
  }

  /**
  * Deletes an observation category
  * Returns {Observable<any>}
  *@param {number} id  
  */
  public delete(id: number) : Observable<any> {
    let url = `${this.baseUrl}/${id}`;
    return this.httpClient.delete(url);
  }
}