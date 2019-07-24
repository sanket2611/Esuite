import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class eSuiteApiStaticFileService {
  private readonly baseUrl = `${environment.eSuiteApi.endpoint}`;
  constructor() { }

  getExcelTemplateUrl(name: string): string {
    return `${this.baseUrl}/templates/excel/${name}`;
  }
}
