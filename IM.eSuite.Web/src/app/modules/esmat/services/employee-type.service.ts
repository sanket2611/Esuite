import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../../environments/environment';
import { EmployeeType } from '../models/employee-type.model';

@Injectable()
export class EmployeeTypeService {
  private readonly baseUrl = `${environment.eSmatApi.endpoint}/api/employeeType`;
  constructor(private httpClient: HttpClient) { }
 
  get(): Observable<EmployeeType[]>{
    let url = `${this.baseUrl}/get`;
    return this.httpClient.get<EmployeeType[]>(url);
  }
}