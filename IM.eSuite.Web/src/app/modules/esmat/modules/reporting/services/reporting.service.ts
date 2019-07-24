import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractDataService, PagedList } from '@im-angular/core';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../../../../environments/environment';
import { ObservationByTypeAndMonthGet } from '../models/observation-by-type-and-month-get.model';
import { PointDateGet } from '../models/point-date-get.model';
import { ReportingRequest } from '../../../../../models/reporting-request.model';
import { SmatByOrganizationRequest } from '../models/smat-by-organization-request.model';
import { SmatByOrganizationGet } from '../models/smat-by-organization-get.model';
import { ObservationReportingRequest } from '../models/observation-reporting-request.model';
import { ObservationByCategoryGet } from '../models/observation-by-category-get.model';
import { ObservationByOrganizationGet } from '../models/observation-by-organization-get.model';
import { SmatByEmployeeRequest } from '../models/smat-by-employee-request.model';
import { SmatByEmployeeGet } from '../models/smat-by-employee-get.model';
import { ObservationByTypeGet } from '../models/observation-by-type-get.model';
import { SmatBySmatorRequest } from '../models/smat-by-smator-request.model';
import { SmatBySmatorGet } from '../models/smat-by-smator-get.model';

@Injectable()
export class ReportingService extends AbstractDataService {
  private readonly baseUrl = `${environment.eSmatApi.endpoint}/api/reporting`;

  constructor(private httpClient: HttpClient) {
    super();
  }

  getSmatByEmployee(request: SmatByEmployeeRequest): Observable<PagedList<SmatByEmployeeGet>> {
    let url = `${this.baseUrl}/smatByEmployee`;
    let query = this.httpParamSerializer(request);
    return this.httpClient.get<PagedList<SmatByEmployeeGet>>(`${url}?${query}`);
  }

  getSmatByEmployeeExcel(request: ReportingRequest): Observable<any> {
    let url = `${this.baseUrl}/smatByEmployee/excel`;
    let query = this.httpParamSerializer(request);
    return this.httpClient.get(`${url}?${query}`, { responseType: 'blob', observe: 'response' });
  }

  getSmatBySmator(request: SmatBySmatorRequest): Observable<PagedList<SmatBySmatorGet>> {
    let url = `${this.baseUrl}/smatBySmator`;
    let query = this.httpParamSerializer(request);
    return this.httpClient.get<PagedList<SmatBySmatorGet>>(`${url}?${query}`);
  }

  getSmatBySmatorExcel(request: ReportingRequest): Observable<any> {
    let url = `${this.baseUrl}/smatBySmator/excel`;
    let query = this.httpParamSerializer(request);
    return this.httpClient.get(`${url}?${query}`, { responseType: 'blob', observe: 'response' });
  }

  getSmatByMonth(request: ReportingRequest): Observable<PointDateGet[]> {
    let url = `${this.baseUrl}/smatByMonth`;
    let query = this.httpParamSerializer(request);
    return this.httpClient.get<PointDateGet[]>(`${url}?${query}`);
  }

  getSmatByOrganization(request: SmatByOrganizationRequest): Observable<SmatByOrganizationGet[]> {
    let url = `${this.baseUrl}/smatByOrganization`;
    let query = this.httpParamSerializer(request);
    return this.httpClient.get<SmatByOrganizationGet[]>(`${url}?${query}`);
  }

  getObservationByType(request: ReportingRequest): Observable<ObservationByTypeGet[]> {
    let url = `${this.baseUrl}/observationByType`;
    let query = this.httpParamSerializer(request);
    return this.httpClient.get<ObservationByTypeGet[]>(`${url}?${query}`);
  }

  getObservationByTypeAndMonth(request: ReportingRequest): Observable<ObservationByTypeAndMonthGet[]> {
    let url = `${this.baseUrl}/observationByTypeAndMonth`;
    let query = this.httpParamSerializer(request);
    return this.httpClient.get<ObservationByTypeAndMonthGet[]>(`${url}?${query}`);
  }

  getObservationByCategory(request: ObservationReportingRequest): Observable<ObservationByCategoryGet[]> {
    let url = `${this.baseUrl}/observationByCategory`;
    let query = this.httpParamSerializer(request);
    return this.httpClient.get<ObservationByCategoryGet[]>(`${url}?${query}`);
  }

  getObservationByOrganization(request: ObservationReportingRequest): Observable<ObservationByOrganizationGet[]> {
    let url = `${this.baseUrl}/observationByOrganization`;
    let query = this.httpParamSerializer(request);
    return this.httpClient.get<ObservationByOrganizationGet[]>(`${url}?${query}`);
  }

  getImmediateAction(request: ReportingRequest): Observable<number> {
    let url = `${this.baseUrl}/immediateAction`;
    let query = this.httpParamSerializer(request);
    return this.httpClient.get<number>(`${url}?${query}`);
  }

  getGaiaExport(year: number, month: number): Observable<any> {
    let url = `${this.baseUrl}/gaiaExport/${year}/${month}`;
    return this.httpClient.get(url, { responseType: 'blob', observe: 'response' });
  }

  getFullReport(request: ReportingRequest): Observable<any> {
    let url = `${this.baseUrl}/fullReport`;
    let query = this.httpParamSerializer(request);
    return this.httpClient.get(`${url}?${query}`, { responseType: 'blob', observe: 'response' });
  }
}