import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractDataService } from '@im-angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { SubCategoryGet } from '../models/subcategory-get.model';

@Injectable()
export class SubCategoryService extends AbstractDataService {
  private readonly baseUrl = `${environment.eActionApi.endpoint}/api/SubCategory`;
  
  constructor(private httpClient: HttpClient) {
    super();
  }

  /**
  * List sub categories
  * Returns {Observable<Array<SubCategoryGet>>}  
  */
  public list(categoryId: number): Observable<Array<SubCategoryGet>> {
    let params = {categoryId: categoryId};
    let query = this.httpParamSerializer(params);    
    return this.httpClient.get<Array<SubCategoryGet>>(`${this.baseUrl}?${query}&keyId=${environment.eActionApi.keyId.eAction}`);
  }
}
