import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { ObservationSubCategoryPlantSave } from '../models/observation-sub-category-plant-save.model';

@Injectable()
export class ObservationSubCategoryPlantService {
  private readonly baseUrl = `${environment.eSmatApi.endpoint}/api/observationSubCategoryPlant`;
  constructor(private httpClient: HttpClient) { }

  /**
  * Creates an observation sub category plant
  * Returns {Observable<any>}  *
  *@param {ObservationSubCategoryPlantSave} observationSubCategoryPlant
  */
  public create(observationSubCategoryPlant: ObservationSubCategoryPlantSave) : Observable<any> {
    return this.httpClient.post(`${this.baseUrl}`, observationSubCategoryPlant);
  }

  /**
  * Deletes an observation sub category plant
  * Returns {Observable}
  *@param {plantId} number
  *@param {subcategoryId} number
  */
  public delete(plantId: number, subcategoryId: number): Observable<any> {
    let url = `${this.baseUrl}/${plantId}/${subcategoryId}`;
    return this.httpClient.delete(url);
  }
}