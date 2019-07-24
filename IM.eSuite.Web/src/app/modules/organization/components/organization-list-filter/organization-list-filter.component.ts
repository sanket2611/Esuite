import { Component, OnInit, Output, EventEmitter, ViewChild, Input, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SelectItem, PagedList } from '@im-angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/map';

import { PlantService } from '../../services/plant.service';
import { PlantSearchService } from '../../services/plant-search.service';
import { OrganizationService } from '../../services/organization.service';

import { Plant } from '../../models/plant';
import { Organization } from '../../models/organization';
import { OrganizationLevelType } from '../../models/organizationLevelType';
import { OrganizationFilter } from '../../models/organizationFilter';

@Component({
  selector: 'app-organization-list-filter',
  templateUrl: './organization-list-filter.component.html',
  styleUrls: ['./organization-list-filter.component.less'],
})
export class OrganizationListFilterComponent implements OnChanges, OnInit, OnDestroy {
  @Input() organizationFilter: OrganizationFilter;
  @Output() onOrganizationFilteredRequest = new EventEmitter<OrganizationFilter>();
  @Output() onFilterRemovedRequest = new EventEmitter<void>(); 
  plant: SelectItem = new SelectItem();
  plantId: number;
  departmentId: number;
  workshopId: number;
  jobId: number;
  workstationId: number;
  
  plants: Array<SelectItem>;
  departments: Array<SelectItem>;
  workshops: Array<SelectItem>;
  jobs: Array<SelectItem>;
  workstations: Array<SelectItem>;
  subscription: Subscription;  

  constructor(private route: ActivatedRoute, private plantSearchService: PlantSearchService,
    private plantService: PlantService, private organizationService: OrganizationService) {}

  ngOnInit() {
    let plants: PagedList<Plant> = this.route.snapshot.data['plants'];
    this.plants = plants.entries.map(p => Plant.toSelectItem(p));
    this.subscription = this.plantSearchService.debounceSearchPlant()
      .subscribe(result => this.plants = result);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges) {

    if(changes.organizationFilter != null)
    {
      this.organizationFilter = changes.organizationFilter.currentValue;

      switch (this.organizationFilter.type) {
        case OrganizationLevelType.Undefined:        
          this.plantId = undefined;
          break;
        case OrganizationLevelType.Plant:
          if(!this.organizationFilter.id) {
            this.departmentId = undefined;
            this.onLevelUpSelected(this.plantId, this.onDepartmentRemoved);            
          } else {
            this.plant = new SelectItem();
            this.plant.id = this.organizationFilter.id;
            this.plant.text = this.organizationFilter.name;
            this.plants = [this.plant];
            this.plantId = this.plant.id;
            this.onOrganizationSelected(this.plant, OrganizationLevelType.Plant).subscribe(d => this.departments = d);
          }
          break;
        case OrganizationLevelType.Department:
          if(!this.organizationFilter.id) {
            this.workshopId = undefined;
            this.onLevelUpSelected(this.departmentId, this.onWorkshopRemoved);            
          } else {
            this.departmentId = this.organizationFilter.id;
            this.onDepartmentSelected(this.organizationFilter.id);
          }
          break;
        case OrganizationLevelType.Workshop:
          if(!this.organizationFilter.id) {
            this.jobId = undefined;
            this.onLevelUpSelected(this.workshopId, this.onJobRemoved);            
          } else {
            this.workshopId = this.organizationFilter.id;
            this.onWorkshopSelected(this.organizationFilter.id);
          }
          break;
        case OrganizationLevelType.Job:          
          if(!this.organizationFilter.id) {
            this.workstationId = undefined;
            this.onLevelUpSelected(this.jobId, this.onWorkstationRemoved);            
          } else {
            this.jobId = this.organizationFilter.id;
            this.onJobSelected(this.organizationFilter.id);
          }
          break;
        case OrganizationLevelType.Workstation:
          this.workstationId = this.organizationFilter.id;
          this.onWorkstationSelected(this.organizationFilter.id);
          break;
      }
    }
  }

  onOrganizationSearchClicked(){
    this.onOrganizationFilteredRequest.emit(this.organizationFilter);
  }

  onPlantSelected(plantId: number) {
    this.plant = this.plants.find(p => p.id == plantId);
    this.onOrganizationSelected(this.plant, OrganizationLevelType.Plant).subscribe(d => this.departments = d);
  }

  onPlantSearchChanged(search: string){
    this.plantSearchService.onPlantSearchChanged(search);
  }

  onDepartmentSelected(departmentId: number){    
    let department = this.departments.find(d => d.id == departmentId);
    this.onOrganizationSelected(department, OrganizationLevelType.Department).subscribe(w => this.workshops = w);
  }

  onWorkshopSelected(workshopId: number){
    let workshop = this.workshops.find(w => w.id == workshopId);
    this.onOrganizationSelected(workshop, OrganizationLevelType.Workshop).subscribe(j => this.jobs = j);
  }

  onJobSelected(jobId: number){
    let job = this.jobs.find(j => j.id == jobId);
    this.onOrganizationSelected(job, OrganizationLevelType.Job).subscribe(w => this.workstations = w);
  }

  onWorkstationSelected(workstationId: number){
    let workstation = this.workstations.find(w => w.id == workstationId);
    this.organizationFilter = new OrganizationFilter(OrganizationLevelType.Workstation, workstation.id, workstation.text);
  }

  onPlantRemoved(){    
    this.departmentId = undefined;
    this.onDepartmentRemoved();
    this.organizationFilter = undefined;
    this.onFilterRemovedRequest.emit();
  }
  
  onDepartmentRemoved(){    
    this.workshopId = undefined;
    this.onWorkshopRemoved();
    this.setOrganization(this.plant, OrganizationLevelType.Plant);    
  }

  onWorkshopRemoved(){
    this.jobId = undefined;
    this.onJobRemoved();
    if(!this.departments){
      return;
    }
    let department = this.departments.find(d => d.id == this.departmentId);
    this.setOrganization(department, OrganizationLevelType.Department);
  }

  onJobRemoved(){
    this.workstationId = undefined;
    if(!this.workshops){
      return;
    }
    let workshop = this.workshops.find(w => w.id == this.workshopId);
    this.setOrganization(workshop, OrganizationLevelType.Workshop);
  }

  onWorkstationRemoved(){
    let job = this.jobs.find(j => j.id == this.jobId);
    this.setOrganization(job, OrganizationLevelType.Job);
  }

  private setOrganization(organization: SelectItem, type: OrganizationLevelType){
    this.organizationFilter = organization? new OrganizationFilter(type, organization.id, organization.text): undefined;
  }

  private onOrganizationSelected(organization: SelectItem, type: OrganizationLevelType): Observable<Array<SelectItem>>{
    this.organizationFilter = new OrganizationFilter(type, organization.id, organization.text);
    let parentId = (type == OrganizationLevelType.Plant)? undefined: organization.id;
    let plantId = (type != OrganizationLevelType.Plant)? undefined: organization.id;

    return this.organizationService.search(undefined, parentId, plantId).map(organizations => {
      return organizations.map(o => Organization.toSelectItem(o));      
    });    
  }

  private onLevelUpSelected(parentOrganizationId: number, removedCallback: () => void){
    this.organizationFilter.id = parentOrganizationId;    
    removedCallback.bind(this)();
    this.onOrganizationFilteredRequest.emit(this.organizationFilter);
  }
}