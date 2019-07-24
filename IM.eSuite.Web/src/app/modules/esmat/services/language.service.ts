import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../../environments/environment';
import { Language } from '../../shared/models/language.model';

@Injectable()
export class LanguageService {
  private readonly baseUrl = `${environment.eSmatApi.endpoint}/api/language`;
  
  constructor(private httpClient: HttpClient) { }

  get(): Observable<Language[]>{
    let url = `${this.baseUrl}/get`;
    return this.httpClient.get<Language[]>(url);
  }
}
