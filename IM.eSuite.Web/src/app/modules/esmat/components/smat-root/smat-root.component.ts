import { Component, OnInit } from '@angular/core';
import { APPSETTINGS } from '../../../../configs/appSettings';
import { MenuItem } from '../../../../models/common/menuItem';

@Component({
  selector: 'app-smat-root',
  templateUrl: './smat-root.component.html',
  styleUrls: ['./smat-root.component.less']
})
export class SmatRootComponent implements OnInit {
  menuItems: MenuItem[];

  ngOnInit() {
    this.menuItems = APPSETTINGS.SIDEBARS.ESMAT;
  }
}