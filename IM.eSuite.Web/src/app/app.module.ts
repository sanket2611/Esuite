import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ToastrModule } from 'ngx-toastr';
import { defineLocale } from 'ngx-bootstrap/chronos';

import { AbstractPageSizeService } from '@im-angular/core';
import { IMAngularAuthenticationModule, TokenInterceptor, ErrorInterceptor, LogoutHeaderComponent, UserHeaderComponent } from '@im-angular/authentication';

import { CoreModule } from './modules/core/core.module';
import { SharedModule } from './modules/shared/shared.module';
import { AppRoutingModule } from './app-routing.module';

import { environment } from '../environments/environment';
import { APPSETTINGS } from './configs/appSettings';

import { HeaderService } from './services/header.service';
import { MenuService } from './services/menu.service';
import { PageSizeService } from './services/page-size.service';
import { ApplicationService } from './services/application.service';
import { eSuiteApiStaticFileService } from './services/esuite-api-static-file.service';
import { FileSaverService } from './services/file-saver.service';
import { ListRequestService } from './services/list-request.service';

import { ApplicationsResolve } from './resolvers/applications.resolve';

import { AppComponent } from './app.component';
import { RootComponent } from './components/root/root.component';
import { HomeComponent } from './components/home/home.component';
import { ApplicationTileComponent } from './components/application-tile/application-tile.component';

import localeFr from '@angular/common/locales/fr';
import localeCs from '@angular/common/locales/cs';
import localeDe from '@angular/common/locales/de';
import localeEs from '@angular/common/locales/es';
import localeFi from '@angular/common/locales/fi';
import localeIt from '@angular/common/locales/it';
import localeKo from '@angular/common/locales/ko';
import localePl from '@angular/common/locales/pl';
import localePt from '@angular/common/locales/pt';
import localeRo from '@angular/common/locales/ro';
import localeRu from '@angular/common/locales/ru';
import localeZh from '@angular/common/locales/zh';
import { enGbLocale, frLocale, csLocale, deLocale, esLocale, fiLocale, itLocale, koLocale, plLocale, ptBrLocale, ruLocale, zhCnLocale } from 'ngx-bootstrap/locale';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, APPSETTINGS.TRANSLATIONS_FOLDER_PATH);
}

registerLocaleData(localeFr);
defineLocale(<string>localeFr[0], frLocale);

registerLocaleData(localeCs);
defineLocale(<string>localeCs[0], csLocale);

registerLocaleData(localeDe);
defineLocale(<string>localeDe[0], deLocale);

registerLocaleData(localeEs);
defineLocale(<string>localeEs[0], esLocale);

registerLocaleData(localeFi);
defineLocale(<string>localeFi[0], fiLocale);

registerLocaleData(localeIt);
defineLocale(<string>localeIt[0], itLocale);

registerLocaleData(localeKo);
defineLocale(<string>localeKo[0], koLocale);

registerLocaleData(localePl);
defineLocale(<string>localePl[0], plLocale);

registerLocaleData(localePt);
defineLocale(<string>localePt[0], ptBrLocale);

registerLocaleData(localeRo);
defineLocale(<string>localeRo[0], enGbLocale);

registerLocaleData(localeRu);
defineLocale(<string>localeRu[0], ruLocale);

registerLocaleData(localeZh);
defineLocale(<string>localeZh[0], zhCnLocale);

@NgModule({  
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    CoreModule, 
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
      provide: TranslateLoader,
      useFactory: (HttpLoaderFactory),
      deps: [HttpClient]
      }
    }),
    IMAngularAuthenticationModule,    
    BsDatepickerModule.forRoot(),
    ToastrModule.forRoot(APPSETTINGS.TOASTR),
    //AppRoutingModule should be imported after all modules defining routes. 
    //Otherwise, these routes will never be catched
    AppRoutingModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
    HeaderService,
    MenuService,
    PageSizeService,
    ApplicationService,
    eSuiteApiStaticFileService,
    FileSaverService,
    ApplicationsResolve,
    {
      provide: AbstractPageSizeService, 
      useClass: PageSizeService
    },
    ListRequestService
  ],
  declarations: [
    AppComponent,
    RootComponent,
    HomeComponent,
    ApplicationTileComponent 
  ],
  entryComponents: [ 
    UserHeaderComponent, 
    LogoutHeaderComponent    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }