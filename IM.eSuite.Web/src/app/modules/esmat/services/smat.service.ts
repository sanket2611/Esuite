import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractDataService } from '@im-angular/core';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../../environments/environment';
import { SmatSave } from '../models/smat-save.model';
import { SmatGet } from '../models/smat-get.model';

@Injectable()
export class SmatService extends AbstractDataService {
  private readonly baseUrl = `${environment.eSmatApi.endpoint}/api/smat`;
  
  constructor(private httpClient: HttpClient) { 
    super();
  }

  /**
  * Get by id
  * Returns {Observable<SmatGet>}
  *@param {number} id
  */
  public get(id: number): Observable<SmatGet>{    
    let url = `${this.baseUrl}/${id}`;
    return this.httpClient.get<SmatGet>(url);
  }

  /**
  * Creates a smat
  * Returns {Observable<number>}
  *@param {SmatSave} smat
  */
  public create(smat: SmatSave) : Observable<SmatGet> {
    return this.httpClient.post<SmatGet>(this.baseUrl, smat);
  }

  /**
  * Updates a smat
  * Returns {Observable<number>}
  *@param {SmatSave} smat
  */
  public update(id:number, smat: SmatSave) : Observable<any> {
    let url = `${this.baseUrl}/${id}`;
    return this.httpClient.put(url, smat);
  }

  /**
  * Deletes a smat
  * Returns {Observable}
  *@param {id} number
  */
  public delete(id: number): Observable<any> {
    let url = `${this.baseUrl}/${id}`;
    return this.httpClient.delete(url);
  }
}