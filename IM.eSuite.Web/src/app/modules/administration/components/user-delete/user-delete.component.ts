import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user.service';
import { ApplicationUser } from '../../models/applicationUser';

import 'rxjs/add/operator/mergeMap';

@Component({
  selector: 'app-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrls: ['./user-delete.component.less']
})
export class UserDeleteComponent implements OnInit {
  @Input()user: ApplicationUser;
  @Input()modal: BsModalRef;
  @Output()deletedUserRequest = new EventEmitter<number>();

  constructor(private userService: UserService, private toastrService: ToastrService,
    private translateService: TranslateService) { }

  ngOnInit() {    
  }

  onDeleteClicked(){
    this.userService.delete(this.user.id)
      .subscribe(response => {
        this.translateService.get("Administration.Users.SuccessfullyDeleted", { SGId: this.user.userName })
          .mergeMap(message => this.toastrService.success(message).onHidden)          
          .subscribe(() => {
            this.deletedUserRequest.emit(this.user.id);          
            this.modal.hide();
          });
      }, error => {
        this.translateService.get("Administration.Users.ErrorDeleted", { SGId: this.user.userName })
          .subscribe(message => this.toastrService.error(message));
      });      
  }
}