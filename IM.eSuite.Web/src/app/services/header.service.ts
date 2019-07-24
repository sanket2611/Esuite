import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HeaderViewModel, HeaderMenuItemViewModel } from '@im-angular/core';
import { UserHeaderComponent, LogoutHeaderComponent } from '@im-angular/authentication';

@Injectable()
export class HeaderService {

  constructor(private translateService: TranslateService) { }

  setHeader() : HeaderViewModel 
  {
    let header = new HeaderViewModel();
    this.translateService.get("Application.Pole").subscribe(t => header.applicationPole = t);
    this.translateService.get("Application.Name").subscribe(t => header.applicationName = t);
    this.translateService.get("Application.ShortName").subscribe(t => header.applicationShortName = t);
    
    let userMenu = new HeaderMenuItemViewModel(UserHeaderComponent);
    header.menuItems.push(userMenu);
    let logoutMenu = new HeaderMenuItemViewModel(LogoutHeaderComponent);
    header.menuItems.push(logoutMenu);

    header.applicationHomeUrl = '/home';    
    return header;
  }
}