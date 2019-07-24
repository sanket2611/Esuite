import { Component, OnInit, OnDestroy, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ActivatedRoute } from '@angular/router';
import { SelectItem } from '@im-angular/core';
import { PlantService } from '../../../organization/services/plant.service';
import { OrganizationService } from '../../../organization/services/organization.service';
import { PlantSearchService } from '../../../organization/services/plant-search.service';
import { Plant } from '../../../organization/models/plant';
import { Organization } from '../../../organization/models/organization';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { LocationGet } from '../../../eaction/models/location-get.model';
import { LocationNamesViewModel } from '../../../erisk/viewModels/loocation-names.viewModel';

@Component({
  selector: 'app-location-fields',
  templateUrl: './location-fields.component.html',
  styleUrls: ['./location-fields.component.less']
})
export class LocationFieldsComponent implements OnInit, OnDestroy {
  @ViewChild('addTaskModal') addTaskModal: ModalDirective;
  @Input() parentForm: FormGroup;
  @Input() location: LocationGet;
  @Input() requiresWorkStation: boolean = true;
  @Output() onPlantChangedRequest: EventEmitter<number> = new EventEmitter<number>();
  @Output() onWorkStationChangedRequest: EventEmitter<LocationNamesViewModel> = new EventEmitter<LocationNamesViewModel>();
  locationForm: FormGroup;
  plants: Array<SelectItem>;
  departments: Array<SelectItem>;
  workshops: Array<SelectItem>;
  jobs: Array<SelectItem>;
  workstations: Array<SelectItem>;
  tasks: Array<SelectItem>;

  resetAddTaskForm: boolean = false;
  selectedWorkstation: SelectItem;
  private subscription: Subscription;

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private organizationService: OrganizationService,
    private plantService: PlantService, private plantSearchService: PlantSearchService) { }

  ngOnInit() {

    this.locationForm = this.formBuilder.group({
      plantId: [null, Validators.required],
      departmentId: [null, Validators.required],
      workshopId: [null, Validators.required],
      jobId: [null, Validators.required],
      workstationId: [null, this.requiresWorkStation ? Validators.required : Validators.nullValidator],
      taskId: []
    });

    this.parentForm.addControl('location', this.locationForm);

    if (this.location) {
      this.plantService.get(this.location.plantId)
        .subscribe(p => this.plants = [Plant.toSelectItem(p)]);
      this.onPlantSelected(this.location.plantId);
      this.onDepartmentSelected(this.location.departmentId);
      this.onWorkshopSelected(this.location.workshopId);
      this.onJobSelected(this.location.jobId);
      this.onWorkstationSelected(this.location.workstationId);
      this.locationForm.setValue(this.location);
    }
    else {
      let plantList = this.route.snapshot.data['plants'];
      this.plants = plantList.entries.map(p => Plant.toSelectItem(p));
    }

    this.subscription = this.plantSearchService.debounceSearchPlant()
      .subscribe(result => this.plants = result);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onPlantSearchChanged(search: string) {
    this.plantSearchService.onPlantSearchChanged(search);
  }

  onPlantSelected(plantId: number) {

    this.locationForm.controls.departmentId.setValue(undefined);
    this.onDepartmentRemoved();

    this.onOrganizationSelected(plantId, undefined)
      .subscribe(o => this.departments = o);

    this.onPlantChangedRequest.emit(plantId);
  }

  onPlantRemoved() {

    this.onDepartmentRemoved();
    this.locationForm.controls.departmentId.setValue(undefined);
    this.departments = [];
    this.onPlantChangedRequest.emit();
  }

  onDepartmentSelected(departmentId: number) {
    this.locationForm.controls.workshopId.setValue(undefined);
    this.onWorkshopRemoved();
    this.onOrganizationSelected(undefined, departmentId)
      .subscribe(o => this.workshops = o);
  }

  onDepartmentRemoved() {
    this.onWorkshopRemoved();
    this.locationForm.controls.workshopId.setValue(undefined);
    this.workshops = [];
  }

  onWorkshopSelected(workshopId: number) {
    this.locationForm.controls.jobId.setValue(undefined);
    this.onJobRemoved();
    this.onOrganizationSelected(undefined, workshopId)
      .subscribe(o => this.jobs = o);
  }

  onWorkshopRemoved() {
    this.onJobRemoved();
    this.locationForm.controls.jobId.setValue(undefined);
    this.jobs = [];
  }

  onJobSelected(jobId: number) {
    this.locationForm.controls.workstationId.setValue(undefined);
    this.onWorkstationRemoved();
    this.onOrganizationSelected(undefined, jobId)
      .subscribe(o => this.workstations = o);
  }

  onJobRemoved() {
    this.onWorkstationRemoved();
    this.locationForm.controls.workstationId.setValue(undefined);
    this.workstations = [];
  }

  onWorkstationSelected(workstationId: number) {
    let locationNames = new LocationNamesViewModel()
    if (this.plants && this.departments && this.workshops && this.workshops && this.jobs && this.workstations) {
      locationNames.PlantName = this.plants.find(p => p.id == this.locationForm.controls.plantId.value).text;
      locationNames.WorkStationName = this.workstations.find(w => w.id == workstationId).text;
    }
    this.onWorkStationChangedRequest.emit(locationNames);
    this.locationForm.controls.taskId.setValue(undefined);
    this.onOrganizationSelected(undefined, workstationId)
      .subscribe(o => this.tasks = o);
  }

  onWorkstationRemoved() {
    this.locationForm.controls.taskId.setValue(undefined);
    this.tasks = [];
  }

  addTask(workstationId: number) {
    let workstation = this.workstations.find(w => w.id === workstationId);
    this.selectedWorkstation = workstation;
    this.addTaskModal.show();
  }

  onTaskAdded(task: Organization) {
    if (this.tasks == undefined) {
      this.tasks = [];
    }
    this.tasks.unshift(Organization.toSelectItem(task));
  }

  onAddTaskModalHidden() {
    this.resetAddTaskForm = true;
  }

  private onOrganizationSelected(plantId: number, organizationId: number): Observable<Array<SelectItem>> {
    return this.organizationService.search(undefined, organizationId, plantId)
      .map(organizations => {
        return organizations.map(o => Organization.toSelectItem(o));
      });
  }
}