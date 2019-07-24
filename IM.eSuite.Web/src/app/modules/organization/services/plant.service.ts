import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractDataService, ListRequest, PagedList } from '@im-angular/core';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../../environments/environment';
import { Plant } from '../models/plant';
import { PlantSearchRequest } from '../models/plantSearchRequest';
import { PlantListRequest } from '../models/plantListRequest';

@Injectable()
export class PlantService extends AbstractDataService {
  private readonly baseUrl = `${environment.eSuiteApi.endpoint}/api/plant`;

  constructor(private httpClient: HttpClient) {
    super();
  }  

  /**
  * List plants
  * Returns {Observable<PageList<Plant>>}
  *@param {OrganizationListRequest} request    
  */
  public list(request: PlantListRequest): Observable<PagedList<Plant>> {
    let query = this.httpParamSerializer(request);      
    return this.httpClient.get<PagedList<Plant>>(`${this.baseUrl}?${query}`);
  }

  /**
  * Search plant by name and Gaia code
  * Returns {Observable<Plant[]>}
  *@param {string} search
  */
  public search(request: PlantSearchRequest): Observable<Plant[]> {    
    let url = `${this.baseUrl}/search`;
    let query = this.httpParamSerializer(request);
    return this.httpClient.get<Plant[]>(`${url}?${query}`);
  }

  /**
  * Get by id
  * Returns {Observable<Plant>}
  *@param {number} id
  */
  public get(id: number): Observable<Plant> {
    let url = `${this.baseUrl}/${id}`;
    return this.httpClient.get<Plant>(url);
  }

  /**
  * Creates a plant
  * Returns {Observable<number>}
  *@param {Plant} plant
  */
  public create(plant: Plant): Observable<number> {
    return this.httpClient.post<number>(this.baseUrl, plant);
  }

  /**
  * Updates a plant
  * Returns {Observable}
  *@param {Plant} plant
  */
  public update(plant: Plant): Observable<any> {
    return this.httpClient.put(this.baseUrl, plant);
  }

  /**
  * Deletes a plant
  * Returns {Observable}
  *@param {id} number
  */
  public delete(id: number): Observable<any> {
    let url = `${this.baseUrl}/${id}`;
    return this.httpClient.delete(url);
  }
}