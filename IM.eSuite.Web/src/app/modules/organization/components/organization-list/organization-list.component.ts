import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { AbstractDataTable, PagedList } from '@im-angular/core';

import { ModalDirective } from 'ngx-bootstrap';

import { AuthorizationService } from '@im-angular/authentication';
import { PageSizeService } from '../../../../services/page-size.service';
import { PlantService } from '../../services/plant.service';
import { ListRequestService } from '../../../../services/list-request.service';
import { OrganizationService } from '../../services/organization.service';
import { eSuiteApiStaticFileService } from '../../../../services/esuite-api-static-file.service';

import { Organization } from '../../models/organization';
import { OrganizationLevelType } from '../../models/organizationLevelType';
import { OrganizationFilter } from '../../models/organizationFilter';
import { OrganizationListRequest } from '../../models/organizationListRequest';
import { PlantListRequest } from '../../models/plantListRequest';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-organization-list',
  templateUrl: './organization-list.component.html',
  styleUrls: ['./organization-list.component.less']
})
export class OrganizationListComponent extends AbstractDataTable<Organization> implements OnInit {
  @ViewChild('deleteOrganizationModal') deleteOrganizationModal: ModalDirective;
  @ViewChild('importOrganizationModal') importOrganizationModal: ModalDirective;
  organizationFilter: OrganizationFilter;
  selectedOrganization: Organization;
  templateUrl: string;
  OrganizationLevelType = OrganizationLevelType;

  constructor(private route: ActivatedRoute,  private plantService: PlantService, private organizationService: OrganizationService, 
    private eSuiteApiStaticFileService: eSuiteApiStaticFileService, pageSizeService: PageSizeService, private listRequestService: ListRequestService,
    public authorizationService: AuthorizationService) {
      super(pageSizeService);
  }  

  ngOnInit() {
    this.data = this.route.snapshot.data['plants'];
    this.updatePagerVm(1);
    this.organizationFilter = new OrganizationFilter(OrganizationLevelType.Undefined);
    this.templateUrl = this.eSuiteApiStaticFileService.getExcelTemplateUrl("esuite_template_organizations.xlsx");
  }

  loadPage(pageNumber: number) {
    let result: Observable<PagedList<Organization>>;

    if (this.organizationFilter.type === OrganizationLevelType.Undefined) {
      let request = this.listRequestService.getListRequest(PlantListRequest, pageNumber, this.pageSizeVm.pageSize, this.sortVm);
      result = this.plantService.list(request);
    } else {
      let request = this.getOrganizationListRequest(pageNumber);
      result = this.organizationService.list(request);
    }

    result.subscribe(response => {
      this.data = response;
      this.updatePagerVm(pageNumber);
    });
  }

  onDeleteOrganizationClicked(organization: Organization) {
    this.selectedOrganization = organization;
    this.deleteOrganizationModal.show();
  }


  onOrganizationDeleted(organizationId: number) {
    this.selectedOrganization = undefined;
    let index = this.data.entries.findIndex(o => o.id === organizationId);
    this.data.entries.splice(index, 1);
  }

  onUpperLevelClicked(){    
    this.organizationFilter = new OrganizationFilter(this.organizationFilter.type - 1, undefined, undefined);
    if(this.organizationFilter.type == OrganizationLevelType.Undefined){
      this.loadPage(1);
    }
  }

  onLowerLevelsClicked(organization: Organization) {
    this.organizationFilter = new OrganizationFilter(this.organizationFilter.type + 1, organization.id, organization.name);
    this.loadPage(1);
  }

  onFilterRemoved() {
    this.organizationFilter = new OrganizationFilter(OrganizationLevelType.Undefined);
    this.loadPage(1);
  }

  onOrganizationFiltered(filter: OrganizationFilter) {    
    this.organizationFilter = filter;
    this.loadPage(1);
  }

  isLevelType(type: OrganizationLevelType): boolean {
    return this.organizationFilter != null && this.organizationFilter.type === type;
  }

  onImportClicked() {
    this.importOrganizationModal.show();
  }

  onOrganizationImported() {
    this.loadPage(1);
  }

  private getOrganizationListRequest(pageNumber: number): OrganizationListRequest {
    let request = this.listRequestService.getListRequest(OrganizationListRequest, pageNumber, this.pageSizeVm.pageSize, this.sortVm);
    
    if (this.organizationFilter.type === OrganizationLevelType.Plant) {
      request.plantId = this.organizationFilter.id;
    } else {
      request.parentId = this.organizationFilter.id;
    }
    return request;
  }
}