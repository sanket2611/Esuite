import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

import { Organization } from '../../models/organization';
import { OrganizationService } from '../../services/organization.service';
import 'rxjs/add/operator/mergeMap';

@Component({
  selector: 'app-organization-delete',
  templateUrl: './organization-delete.component.html',
  styleUrls: ['./organization-delete.component.less']
})
export class OrganizationDeleteComponent implements OnInit {
  @Input()organization: Organization;
  @Input()modal: BsModalRef;
  @Output()deletedOrganizationRequest = new EventEmitter<number>();

  constructor(private organizationService: OrganizationService, private toastrService: ToastrService,
    private translateService: TranslateService) { }

  ngOnInit() {    
  }

  onDeleteClicked(){
    this.organizationService.delete(this.organization.id)
      .subscribe(response => {
        this.translateService.get("Organization.SuccessfullyDeleted", { name: this.organization.name })
          .mergeMap(message => this.toastrService.success(message).onHidden)          
          .subscribe(() => {
            this.deletedOrganizationRequest.emit(this.organization.id);
            this.modal.hide();
          });
      }, error => {
        this.translateService.get("Organization.ErrorDeleted", { name: this.organization.name })
          .subscribe(message => this.toastrService.error(message));
      });
  }
}