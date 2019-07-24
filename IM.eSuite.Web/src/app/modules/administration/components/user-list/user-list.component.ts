import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { AbstractDataTable, PagedList } from '@im-angular/core';

import { ModalDirective } from 'ngx-bootstrap';

import { AuthorizationService } from '@im-angular/authentication';
import { PageSizeService } from '../../../../services/page-size.service';
import { eSuiteApiStaticFileService } from '../../../../services/esuite-api-static-file.service';
import { UserService } from '../../services/user.service';

import { ApplicationUser } from '../../models/applicationUser';

import 'rxjs/add/operator/map';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.less']
})
export class UserListComponent extends AbstractDataTable<ApplicationUser> implements OnInit {
  @ViewChild('deleteUserModal') deleteUserModal: ModalDirective;
  @ViewChild('importUserModal') importUserModal: ModalDirective;
  selectedUser: ApplicationUser;
  templateUrl: string;

  constructor(private route: ActivatedRoute,  private userService: UserService, pageSizeService: PageSizeService,
     private eSuiteApiStaticFileService: eSuiteApiStaticFileService, public authorizationService: AuthorizationService) {
      super(pageSizeService);
  }  

  ngOnInit() {
    this.data = this.route.snapshot.data['users'];    
    this.updatePagerVm(1);
    this.templateUrl = this.eSuiteApiStaticFileService.getExcelTemplateUrl("esuite_template_users.xlsx");
  }

  loadPage(i: number){
   this.userService.list(i, this.pageSizeVm.pageSize, this.sortVm).subscribe(response => {
     this.data = response;
     this.updatePagerVm(i);
    });
  }  

  onDeleteClicked(user: ApplicationUser){
    this.selectedUser = user;
    this.deleteUserModal.show();
  }

  onUserDeleted(userId: number){
    this.selectedUser = undefined;
    let index = this.data.entries.findIndex(u => u.id == userId);
    this.data.entries.splice(index, 1);
  }

  onFilterRemoved(){
    this.loadPage(1);
  }

  onUserFiltered(data: PagedList<ApplicationUser>){
    this.data = data;
  }

  onImportClicked(){
    this.importUserModal.show();
  }

  onUserImported(){
    this.loadPage(1);
  }
}