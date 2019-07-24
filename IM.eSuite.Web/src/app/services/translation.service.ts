import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ITranslatable } from '../interfaces/itranslatable.interface';

@Injectable()
export class TranslationService {

  constructor(private translateService: TranslateService) { }

  get(descriptions: ITranslatable[]): string {

    if(!descriptions){
      return null;
    }

    var lang = this.translateService.getBrowserLang();
    var description = descriptions.find(t => t.language == lang);
    
    if(!description){
      lang = this.translateService.getDefaultLang();
      description = descriptions.find(t => t.language == lang);
    }

    if(!description && descriptions.length > 0){
      description = descriptions[0];
    }

    return description ? description.value: null;
  }
}