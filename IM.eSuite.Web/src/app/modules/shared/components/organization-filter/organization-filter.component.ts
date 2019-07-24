import { Component, Input, OnInit, Output, EventEmitter, OnDestroy, TemplateRef, ContentChild } from '@angular/core';
import { OrganizationFilterViewModel } from '../../viewModels/organization-filter.viewModel';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { PlantSearchService } from '../../../organization/services/plant-search.service';
import { OrganizationService } from '../../../organization/services/organization.service';
import { PagedList, SelectItem } from '@im-angular/core';
import { Plant } from '../../../organization/models/plant';
import { Organization } from '../../../organization/models/organization';
import { OrganizationFilterConfiguration } from '../../models/organization-filter-configuration.model';

@Component({
  selector: 'app-organization-filter',
  templateUrl: './organization-filter.component.html',
  styleUrls: ['./organization-filter.component.less']
})
export class OrganizationFilterComponent implements OnInit, OnDestroy {
  @Input() configuration = new OrganizationFilterConfiguration();
  @ContentChild(TemplateRef) additionalFieldsTemplate: TemplateRef<any>;
  @Output() onFilterChanged: EventEmitter<OrganizationFilterViewModel> = new EventEmitter<OrganizationFilterViewModel>();
  @Output() onFilterRemoved = new EventEmitter<void>();
  @Output() onPlantChanged = new EventEmitter<number>();

  model: OrganizationFilterViewModel;
  plants: Array<SelectItem>;
  departments: Array<SelectItem>;
  workshops: Array<SelectItem>;
  jobs: Array<SelectItem>;
  workstations: Array<SelectItem>;
  private subscription: Subscription;

  constructor(private route: ActivatedRoute, private plantSearchService: PlantSearchService,
    private organizationService: OrganizationService) {
  }

  ngOnInit() {
    this.model = new OrganizationFilterViewModel();
    let plants: PagedList<Plant> = this.route.snapshot.data['plants'];
    if (plants === undefined) {
      throw new Error('Please provide route data for plants');
    }
    this.plants = plants.entries.map(p => Plant.toSelectItem(p));
    this.subscription = this.plantSearchService.debounceSearchPlant()
      .subscribe(result => this.plants = result);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onPlantSelected(plantId: number) {
    this.onOrganizationSelected(plantId, undefined).subscribe(d => this.departments = d);
    this.onPlantChanged.emit(plantId);
  }

  onPlantSearchChanged(search: string) {
    this.plantSearchService.onPlantSearchChanged(search);
  }

  onDepartmentSelected(departmentId: number) {
    this.onOrganizationSelected(undefined, departmentId).subscribe(w => this.workshops = w);
  }

  onWorkshopSelected(workshopId: number) {
    this.onOrganizationSelected(undefined, workshopId).subscribe(j => this.jobs = j);
  }

  onJobSelected(jobId: number) {
    this.onOrganizationSelected(undefined, jobId).subscribe(w => this.workstations = w);
  }

  onPlantRemoved() {
    this.model.departmentId = undefined;
    this.onDepartmentRemoved();
    this.onPlantChanged.emit(0);
    if (!this.model.dateRange || !this.model.dateRange[0] || !this.model.dateRange[1]) {
      this.onFilterRemoved.emit();
    }
  }

  onDepartmentRemoved() {
    this.model.workshopId = undefined;
    this.onWorkshopRemoved();
  }

  onWorkshopRemoved() {
    this.model.jobId = undefined;
    this.onJobRemoved();
  }

  onJobRemoved() {
    this.model.workstationId = undefined;
  }

  onDateRangeChanged(dateRange: Date[]) {
    if (!this.model.plantId && (!dateRange && this.model.dateRange)) {
      this.onFilterRemoved.emit();
    }
  }

  onSearchClicked() {
    this.onFilterChanged.emit(this.model);
  }

  private onOrganizationSelected(plantId: number, parentId: number): Observable<Array<SelectItem>> {
    return this.organizationService.search(undefined, parentId, plantId).map(organizations => organizations.map(Organization.toSelectItem));
  }
}
