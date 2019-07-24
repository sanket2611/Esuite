import { Component, OnInit, HostListener, Input } from '@angular/core';
import { SideBarViewModel, HeaderViewModel } from '@im-angular/core';
import { HeaderService } from '../../../../services/header.service';
import { MenuService } from '../../../../services/menu.service';
import { AdminLteService } from '../../../../services/admin-lte.service';
import { Subscription } from 'rxjs/Subscription';
import { MenuItem } from '../../../../models/common/menuItem';

@Component({
  selector: 'app-base-root',
  templateUrl: './base-root.component.html',
  styleUrls: ['./base-root.component.less']
})
export class BaseRootComponent implements OnInit {
  @Input() menuItems: MenuItem[];
  sideBar: SideBarViewModel;
  header: HeaderViewModel;
  contentHeight: number;
  private subscription: Subscription;

  constructor(private headerService: HeaderService, private menuService: MenuService, 
    private adminLteService: AdminLteService) {
  }

  ngOnInit() {
    this.header = this.headerService.setHeader();
    this.sideBar = this.menuService.setMenu(this.menuItems);
    this.subscription = this.adminLteService.debounceWindowSizeChanged()
      .subscribe((height) => this.contentHeight = height);
    this.onResize();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  @HostListener('window:resize', ['$event'])
  onResize(){
    this.adminLteService.onWindowSizeChanged();
  }
}
