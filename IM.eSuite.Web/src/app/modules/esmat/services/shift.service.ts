import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../../environments/environment';
import { Shift } from '../models/shift.model';

@Injectable()
export class ShiftService {
  private readonly baseUrl = `${environment.eSmatApi.endpoint}/api/shift`;

  constructor(private httpClient: HttpClient) { }

  get(): Observable<Shift[]>{
    return this.httpClient.get<Shift[]>(this.baseUrl);
  }
}
