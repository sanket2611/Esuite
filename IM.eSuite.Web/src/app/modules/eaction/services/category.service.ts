import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { CategoryGet } from '../models/category-get.model';

@Injectable()
export class CategoryService {
  private readonly baseUrl = `${environment.eActionApi.endpoint}/api/Category`;
  
  constructor(private httpClient: HttpClient) {    
  }

  /**
  * List categories
  * Returns {Observable<Array<CategoryGet>>}  
  */
  public list(): Observable<Array<CategoryGet>> {    
    return this.httpClient.get<Array<CategoryGet>>(`${this.baseUrl}?keyId=${environment.eActionApi.keyId.eAction}`);
  }
}