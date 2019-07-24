import { Injectable } from '@angular/core';
import { AbstractDataService } from '@im-angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { MeanOfControlList } from '../models/mean-of-control-list.model';
import { MeanOfControlSave } from '../models/mean-of-control-save.model';
import { MeanOfControlGet } from '../models/mean-of-control-get.model';

@Injectable()
export class MeanOfControlService extends AbstractDataService {
  private readonly baseUrl = `${environment.eRiskApi.endpoint}/api/meanofcontrol`;
  
  constructor(private httpClient: HttpClient) {
    super();
  }

  /**
  * List means of control
  * Returns {Observable<MeanOfControlList[]>}
  *@param {number} plantId    
  */
  list(plantId: number): Observable<MeanOfControlList[]>{
    let url = `${this.baseUrl}`;
    let request = {plantId: plantId};
    let query = this.httpParamSerializer(request);
    return this.httpClient.get<MeanOfControlList[]>(`${url}?${query}`);
  }

  /**
  * Creates a mean of control
  * Returns {Observable<MeanOfControlGet>}
  *@param {MeanOfControlSave} meanOfControl
  */
  public create(meanOfControl: MeanOfControlSave) : Observable<MeanOfControlGet> {
    return this.httpClient.post<MeanOfControlGet>(this.baseUrl, meanOfControl);
  }
}