import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractDataService, PagedList } from '@im-angular/core';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../../../../environments/environment';
import { RiskByOrganizationGet } from '../models/risk-by-organization-get.model';
import {ReportingRequest } from '../models/reporting-request.model';
import { ScoringByOrganizationGet } from '../models/scoring-by-organization-get.model';
import { RiskByHazardGet } from '../models/risk-by-hazard-get.model';
import { OverviewGet } from '../models/overview-get.model';

@Injectable()
export class ReportingService extends AbstractDataService {
  private readonly baseUrl = `${environment.eRiskApi.endpoint}/api/reporting`;

  constructor(private httpClient: HttpClient) {
    super();
  }

  getOverview(request: ReportingRequest): Observable<OverviewGet[]> {
    let url = `${this.baseUrl}/overview`;
    let query = this.httpParamSerializer(request);
    return this.httpClient.get<OverviewGet[]>(`${url}?${query}`);
  }

  getRiskByOrganization(request: ReportingRequest): Observable<RiskByOrganizationGet[]> {
    let url = `${this.baseUrl}/riskByOrganization`;
    let query = this.httpParamSerializer(request);
    return this.httpClient.get<RiskByOrganizationGet[]>(`${url}?${query}`);
  }

  getScoringByOrganization(request: ReportingRequest): Observable<ScoringByOrganizationGet[]> {
    let url = `${this.baseUrl}/scoringByOrganization`;
    let query = this.httpParamSerializer(request);
    return this.httpClient.get<ScoringByOrganizationGet[]>(`${url}?${query}`);
  }

  getRiskByHazard(request: ReportingRequest): Observable<RiskByHazardGet[]> {
    let url = `${this.baseUrl}/riskByHazard`;
    let query = this.httpParamSerializer(request);
    return this.httpClient.get<RiskByHazardGet[]>(`${url}?${query}`);
  }
}