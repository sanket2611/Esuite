import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractDataService } from '@im-angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { EpiPlantException } from '../modules/master-data/models/epi-plant-exception';


@Injectable()
export class EpiPlantService extends AbstractDataService {
  private readonly baseUrl = `${environment.eRiskApi.endpoint}/api/EpiPlant`;

  constructor(private httpClient: HttpClient) {
    super();
  }
/**
  * add a Epi plant exception
  * Returns {Observable<any>}

  *@param {epiPlantException} EpiPlantException  
  */
 public create(epiPlantException: EpiPlantException): Observable<any> {

    let url = `${this.baseUrl}`;
    return this.httpClient.post(url, epiPlantException);

  }


  /**
  * delete a Epi plant exception
  * Returns {Observable<any>}

  *@param {epiPlantException} EpiPlantException  
  */
  public delete(epiPlantException: EpiPlantException): Observable<any> {
      
    let url = `${this.baseUrl}`;
    let query = this.httpParamSerializer(epiPlantException);
    return this.httpClient.delete(`${url}?${query}` );

  }
}