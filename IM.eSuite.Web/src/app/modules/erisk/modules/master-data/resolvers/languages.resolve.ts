import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Language } from '../../../../shared/models/language.model';
import { LanguageService } from '../../../services/language.service';

@Injectable()
export class LanguagesResolve implements Resolve<Language[]> {

    constructor(private languageService: LanguageService) { }

    resolve(route: ActivatedRouteSnapshot) {        
        return this.languageService.get();
    }
}