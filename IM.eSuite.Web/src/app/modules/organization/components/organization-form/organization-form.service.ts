import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { OrganizationService } from '../../services/organization.service';
import { Organization } from '../../models/organization';


@Injectable()
export class OrganizationFormService {

  constructor(private organizationService: OrganizationService, private translateService: TranslateService,
    private toastrService: ToastrService, private router: Router) { }

  createOrganization(organization: Organization): Observable<Organization>{
    let o = this.sanitizeOrganization(organization);
    return this.organizationService.create(o).do(
      result => {
        this.saveSuccess("Organization.SuccessfullyCreated", organization.name);           
      },
      error => {
        if(error){          
          switch(error.status){
            case 409:
              this.translateService.get("Organization.AlreadyExists", { name: organization.name })
                .subscribe(message => this.toastrService.error(message));
              break;
            default:
              break;
          }
        }
      });
  }

  updateOrganization(organization: Organization): Observable<any>{
    let o = this.sanitizeOrganization(organization);
    return this.organizationService.update(o).do(result => {
        this.saveSuccess("Organization.SuccessfullyUpdated", organization.name);
      },
      error => {
        if(error){          
          switch(error.status){
            case 404:
              this.translateService.get("Organization.NotFound", { id: organization.id })
                .subscribe(message => this.toastrService.error(message));              
              break;
            case 409:
              this.translateService.get("Organization.AlreadyExists", { name: organization.name })
                .subscribe(message => this.toastrService.error(message));
              break;
            default:
              break;
          }
        }
      });
  }

  private sanitizeOrganization(organization: Organization): Organization{
    let o = new Organization(organization);
    o.plant = undefined;
    o.parent = undefined;
    return o;
  }

  private saveSuccess(messageTranslationKey: string, name: string)
  {
    this.translateService.get(messageTranslationKey, { name: name })
      .subscribe(message => { 
        this.toastrService.success(message).onHidden.subscribe(() => 
          this.router.navigate(['/organizations']));            
      });
  }
}
