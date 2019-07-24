import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user.service';

import { ApplicationUser } from '../../models/applicationUser';
import { DirectoryService } from '../../services/directory.service';

@Injectable()
export class UserFormService {

  constructor(private userService: UserService, private directoryService: DirectoryService, private translateService: TranslateService,
    private toastrService: ToastrService, private router: Router) { }

  createUser(user: ApplicationUser): Observable<number>{
    let u = this.sanitizeUser(user);
    return this.userService.create(u).do(
      result => {
        this.saveSuccess("Administration.Users.SuccessfullyCreated", user.userName);           
      },
      error => {
        if(error){          
          switch(error.status){
            case 409:
              this.translateService.get("Administration.Users.AlreadyExists", { SGId: user.userName })
                .subscribe(message => this.toastrService.error(message));              
              break;
            default:
              break;
          }
        }
      });
  }

  updateUser(user: ApplicationUser): Observable<any>{
    let u = this.sanitizeUser(user);
    return this.userService.update(u).do(result => {
        this.saveSuccess("Administration.Users.SuccessfullyUpdated", user.userName);
      },
      error => {
        if(error){          
          switch(error.status){
            case 404:
              this.translateService.get("Administration.Users.NotFound", { id: user.id })
                .subscribe(message => this.toastrService.error(message));
              break;
            default:
              break;
          }
        }
      });
  }

  onDirectorySearchClicked(SGId: string): Observable<ApplicationUser> {    
    return this.directoryService.getBySgId(SGId)
      .do(u => u,
        error => {
          if(error.status == 404){
            this.translateService.get("Administration.Users.NotFoundInDirectory", { SGId: SGId })
              .subscribe(message => this.toastrService.warning(message));
          }
        });
  }

  private saveSuccess(messageTranslationKey: string, SGId: string)
  {
    this.translateService.get(messageTranslationKey, { SGId: SGId })
      .subscribe(message => { 
        this.toastrService.success(message).onHidden.subscribe(() => 
          this.router.navigate(['/users']));            
      });
  }

  private sanitizeUser(user: ApplicationUser): ApplicationUser {
    let u = new ApplicationUser(user);
    u.userGroups = u.userGroups.filter(ug => ug.applicationUserGroupId && ug.applicationUserGroupId != 0);
    u.userGroups.forEach(ug => ug.applicationUserGroup = undefined);
    u.plants.forEach(up => up.plant = undefined);   
    return u;
  }
}