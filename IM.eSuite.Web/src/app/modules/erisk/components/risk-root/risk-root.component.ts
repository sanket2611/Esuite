import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../../../../services/header.service';
import { MenuService } from '../../../../services/menu.service';
import { APPSETTINGS } from '../../../../configs/appSettings';
import { MenuItem } from '../../../../models/common/menuItem';

@Component({
  selector: 'app-risk-root',
  templateUrl: './risk-root.component.html',
  styleUrls: ['./risk-root.component.less']
})
export class RiskRootComponent implements OnInit {
  menuItems: MenuItem[];

  constructor(private headerService: HeaderService, private menuService: MenuService) { }

  ngOnInit() {
    this.menuItems = APPSETTINGS.SIDEBARS.ERISK;
  }
}