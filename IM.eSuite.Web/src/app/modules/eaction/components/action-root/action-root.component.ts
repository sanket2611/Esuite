import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { APPSETTINGS } from '../../../../configs/appSettings';
import { SourceEnum } from '../../enums/source.enum';
import { MenuItem } from '../../../../models/common/menuItem';

@Component({
  selector: 'app-action-root',
  templateUrl: './action-root.component.html',
  styleUrls: ['./action-root.component.less']
})
export class ActionRootComponent implements OnInit {
  menuItems: MenuItem[];
  
  constructor(private route: ActivatedRoute) { 
  }

  ngOnInit() {
    var source = this.route.snapshot.paramMap.get('source');
    
    var sideBar = APPSETTINGS.SIDEBARS.EACTION.map(mi => Object.assign({}, mi));
    if(source){      
      let homeMenu = sideBar.find(m => m.link == '/home');
      if(homeMenu){
        switch (SourceEnum[source]) {
          case SourceEnum.eSMAT:
            homeMenu.link = '/e-smat';
            homeMenu.label = `${source}.BackMenu`;
            break;      
          default:
            break;
        }
      }
    }

    this.menuItems = sideBar;
  }
}