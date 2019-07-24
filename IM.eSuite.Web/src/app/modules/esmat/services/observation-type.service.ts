import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { ObservationType } from '../models/observation-type.model';

@Injectable()
export class ObservationTypeService {
  private readonly baseUrl = `${environment.eSmatApi.endpoint}/api/observationType`;

  constructor(private httpClient: HttpClient) { }

  get(): Observable<ObservationType[]>{
    let url = `${this.baseUrl}/get`;
    return this.httpClient.get<ObservationType[]>(url);
  }
}