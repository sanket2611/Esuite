import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthorizationService } from '@im-angular/authentication';
import { OrganizationFormService } from './organization-form.service';
import { Organization } from '../../models/organization';
import { Plant } from '../../models/plant';

@Component({
  selector: 'app-organization-form',
  templateUrl: './organization-form.component.html',
  styleUrls: ['./organization-form.component.less']
})
export class OrganizationFormComponent implements OnInit {
  organization: Organization;
  isSaveInProgress = false;
  private isEdition = false;
  constructor(private route: ActivatedRoute, private organizationFormService: OrganizationFormService, public authorizationService: AuthorizationService) { }

  ngOnInit() {
    this.organization = new Organization();

    let routeOrganization = this.route.snapshot.data['organization'];    
    if (routeOrganization)
    {
      this.organization = routeOrganization;      
      this.isEdition = true;
    }
    else
    {
      let parentOrganization: Organization = this.route.snapshot.data['parentOrganization'];
      if(parentOrganization){
        this.organization.parentId = parentOrganization.id;
        this.organization.parent = parentOrganization;
      }

      let plant: Plant = this.route.snapshot.data['plant'];
      if(plant){
        this.organization.plantId = plant.id;
        this.organization.plant = plant;
      }      
    }
  }

  onSubmit() {
    this.isSaveInProgress = true;
    let saveObservable = this.isEdition? this.organizationFormService.updateOrganization(this.organization)
      : this.organizationFormService.createOrganization(this.organization);
    
    saveObservable.finally(() => this.isSaveInProgress = false)
      .subscribe();
  }
}