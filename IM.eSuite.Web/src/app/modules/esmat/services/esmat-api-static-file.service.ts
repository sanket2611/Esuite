import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable()
export class eSmatApiStaticFileService {
  private readonly baseUrl = `${environment.eSmatApi.endpoint}`;
  constructor() { }

  getExcelTemplateUrl(name: string): string {
    return `${this.baseUrl}/templates/excel/${name}`;
  }
}