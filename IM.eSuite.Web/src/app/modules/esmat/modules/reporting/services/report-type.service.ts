import { Injectable } from '@angular/core';
import { ReportTypeEnum } from '../enums/report-type-enum';
import { SelectItem } from '@im-angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class ReportTypeService {

  constructor(private translateService: TranslateService) { }

  get(): SelectItem[]{
    let basePath = 'eSMAT.Reporting.Type';    
    let enumValues = Object.keys(ReportTypeEnum)
      .filter(k => !isNaN(Number(ReportTypeEnum[k])))
      
    let keys = enumValues.map(k => `${basePath}.${k}`);    
    let messages: any;

    this.translateService.get(keys)
      .subscribe(m => messages = m);
    
    return enumValues.map(e => {
      return {id: ReportTypeEnum[e], text: messages[`${basePath}.${e}`]};
    });
  }
}