import { HazardPlantException } from '../modules/master-data/models/hazard-plant-exception.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractDataService } from '@im-angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class HazardPlantService extends AbstractDataService {
  private readonly baseUrl = `${environment.eRiskApi.endpoint}/api/HazardPlant`;

  constructor(private httpClient: HttpClient) {
    super();
  }
/**
  * add a hazard plant exception
  * Returns {Observable<any>}

  *@param {HazardPlantException} hazardPlantException  
  */
 public create(hazardPlantException: HazardPlantException): Observable<any> {

    let url = `${this.baseUrl}`;
    return this.httpClient.post(url, hazardPlantException);

  }


  /**
  * delete a hazard plant exception
  * Returns {Observable<any>}

  *@param {HazardPlantException} hazardPlantException  
  */
  public delete(hazardPlantException: HazardPlantException): Observable<any> {
      
    let url = `${this.baseUrl}`;
    let query = this.httpParamSerializer(hazardPlantException);
    return this.httpClient.delete(`${url}?${query}` );

  }
}