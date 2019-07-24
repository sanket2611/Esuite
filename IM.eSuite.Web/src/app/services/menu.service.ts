import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SideBarItemViewModel, SideBarViewModel } from '@im-angular/core';
import { AuthorizationService } from '@im-angular/authentication';
import { MenuItem } from '../models/common/menuItem';

@Injectable()
export class MenuService {

  constructor(private authorizationService: AuthorizationService, private translateService: TranslateService) { }

  setMenu(menuItems : Array<MenuItem>){
    let sideBar = new SideBarViewModel();
    
    for(let sb of menuItems )
    {
      if(sb.role && !this.authorizationService.hasRole(sb.role)){
        continue;
      }

      if(!sb.role && sb.subItems){
        let hasOneRole = sb.subItems.map(si => this.authorizationService.hasRole(si.role))
          .some(i => i == true);
        if(!hasOneRole){
          continue;
        }
      }

      let sbItem = new SideBarItemViewModel();
      sbItem.link = sb.link;
      sbItem.iconClassName = sb.iconClassName;
      this.translateService.get(sb.label).subscribe(t => sbItem.label = t);
      
      if(sb.subItems)
      {
        let subItems = sb.subItems.filter(val => this.authorizationService.hasRole(val.role));
        if(subItems.length > 0)
        {          
          sbItem.subItems = new Array<SideBarItemViewModel>();
          
          for(let subItem of sb.subItems)
          {
            let subItemVm = new SideBarItemViewModel();
            subItemVm.link = subItem.link;
            subItemVm.iconClassName = subItem.iconClassName;
            this.translateService.get(subItem.label).subscribe(t => subItemVm.label = t);
            sbItem.subItems.push(subItemVm);
          }
        }
      }

      sideBar.items.push(sbItem);
    }

    return sideBar;
  }
}