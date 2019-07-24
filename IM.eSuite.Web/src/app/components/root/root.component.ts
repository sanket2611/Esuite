import { Component, OnInit } from '@angular/core';
import { APPSETTINGS } from '../../configs/appSettings';
import { MenuItem } from '../../models/common/menuItem';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.less']
})
export class RootComponent implements OnInit {
  menuItems: MenuItem[];
  
  constructor() { 
  }

  ngOnInit() {
    this.menuItems = APPSETTINGS.SIDEBARS.ESUITE;
  }  
}