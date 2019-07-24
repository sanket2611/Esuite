import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PagedList, AbstractDataService } from '@im-angular/core';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../../environments/environment';
import { SmatReceiverListRequest } from '../models/smat-receiver-list-request.model';
import { SmatReceiverList } from '../models/smat-receiver-list.model';
import { SmatReceiverSave } from '../models/smat-receiver-save.model';
import { SmatReceiverViewModel } from '../viewModels/smat-receiver.viewModel';
import { ImportResult } from '../../../models/importResult';

@Injectable()
export class SmatReceiverService extends AbstractDataService {
  private readonly baseUrl = `${environment.eSmatApi.endpoint}/api/smatee`;

  constructor(private httpClient: HttpClient) { 
    super();
  }
    
  /**
  * List smat receivers
  * Returns {Observable<PageList<SmatReceiver>>}
  *@param {SmatReceiverListRequest} request    
  */
  public list(request: SmatReceiverListRequest): Observable<PagedList<SmatReceiverList>> {
    let url = `${this.baseUrl}/get`;
    let query = this.httpParamSerializer(request);
    return this.httpClient.get<PagedList<SmatReceiverList>>(`${url}?${query}`);
  }

  /**
  * Get by id
  * Returns {Observable<SmatReceiver>}
  *@param {number} id
  */
  public get(id: number): Observable<SmatReceiverViewModel>{    
    let url = `${this.baseUrl}/${id}`;
    return this.httpClient.get<SmatReceiverViewModel>(url);
  }

  /**
  * Get smat receivers by plant id
  * Returns {Observable<SmatReceiver[]>}
  *@param {plantId} number    
  */
  public getByPlantId(plantId: number): Observable<SmatReceiverList[]>{    
    let url = `${this.baseUrl}/getByPlantId/${plantId}`;
    return this.httpClient.get<SmatReceiverList[]>(`${url}`);
  }

  /**
  * Creates a smat receiver
  * Returns {Observable<number>}
  *@param {SmatReceiverSave} smatReceiver
  */
  public create(smatReceiver: SmatReceiverSave) : Observable<SmatReceiverSave> {
    return this.httpClient.post<SmatReceiverSave>(this.baseUrl, smatReceiver);
  }

  /**
  * Updates a smat receiver
  * Returns {Observable}
  *@param {SmatReceiverSave} samtReceiver
  */
  public update(smatReceiver: SmatReceiverSave) : Observable<any> {
    return this.httpClient.put(this.baseUrl, smatReceiver);
  }

  /**
  * Deletes a smat receiver
  * Returns {Observable}
  *@param {id} number
  */
  public delete(id: number): Observable<any> {
    let url = `${this.baseUrl}/${id}`;
    return this.httpClient.delete(url);
  }

  /**
  * Import smat receivers
  * Returns {Observable}
  *@param {data} FormData
  */
  public import(data: FormData): Observable<ImportResult> {
    let url = `${this.baseUrl}/import`;
    return this.httpClient.post<ImportResult>(url, data);
  }
}