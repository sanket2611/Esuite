import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {Router, NavigationEnd} from '@angular/router'
import { environment } from '../environments/environment';
import { BsLocaleService } from 'ngx-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {  
  
  constructor(private translateService: TranslateService, private localeService: BsLocaleService, private router : Router) {} 

  ngOnInit(){
    this.setTranslation();
    this.setRouterListener();
  }

  private setTranslation() {    
    this.translateService.addLangs(environment.translation.languages);
    this.translateService.setDefaultLang(environment.translation.defaultLanguage);
    let browserLang = this.translateService.getBrowserLang();
    let appLanguage = this.translateService.langs.some(l => l == browserLang) ? browserLang 
      : this.translateService.getDefaultLang();
    this.translateService.use(appLanguage);
    this.localeService.use(appLanguage);
  }

  private setRouterListener()
  {
    this.router.events
    .filter((event) => event instanceof NavigationEnd)
    .subscribe(() => {
      document.documentElement.scroll(0,0);
    });
  }
}
