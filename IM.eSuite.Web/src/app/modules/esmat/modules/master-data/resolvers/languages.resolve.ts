import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { LanguageService } from '../../../services/language.service';
import { Language } from '../../../../shared/models/language.model';

@Injectable()
export class LanguagesResolve implements Resolve<Language[]> {

    constructor(private languageService: LanguageService) { }

    resolve(route: ActivatedRouteSnapshot) {        
        return this.languageService.get();
    }
}