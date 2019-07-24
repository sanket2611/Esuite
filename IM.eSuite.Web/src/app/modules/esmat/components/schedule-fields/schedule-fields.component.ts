import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SelectItem } from '@im-angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { UserService } from '../../../administration/services/user.service';
import { SmatUser } from '../../models/smat-user.model';
import { Organization } from '../../../organization/models/organization';
import { Plant } from '../../../organization/models/plant';
import { OrganizationService } from '../../../organization/services/organization.service';
import { PlantSearchService } from '../../../organization/services/plant-search.service';
import { ScheduleGet } from '../../models/schedule-get.model';
import { SmatReceiverList } from '../../models/smat-receiver-list.model';
import { SmatReceiverService } from '../../services/smat-receiver.service';
import { ScheduleViewModel } from '../../viewModels/schedule.viewModel';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { NotEqualValidator } from '../../../shared/validators/not-equal.validator';

@Component({
  selector: 'app-schedule-fields',
  templateUrl: './schedule-fields.component.html',
  styleUrls: ['./schedule-fields.component.less']
})
export class ScheduleFieldsComponent implements OnInit, OnDestroy {
  @ViewChild('addTaskModal') addTaskModal: ModalDirective;
  @ViewChild('addReceiverModal') addReceiverModal: ModalDirective;
  @Input() parentForm: FormGroup;
  @Input() schedule: ScheduleGet;
  @Input() tasks: Array<SelectItem>;
  @Output() onSmateeChangedRequest: EventEmitter<Array<SelectItem>> = new EventEmitter<Array<SelectItem>>();
  @Output() onPlantChangedRequest: EventEmitter<number> = new EventEmitter<number>();

  plants: Array<SelectItem>;
  departments: Array<SelectItem>;
  workshops: Array<SelectItem>;
  jobs: Array<SelectItem>;
  workstations: Array<SelectItem>;
  smatLeaders: Array<SelectItem>;
  smatReceivers: Array<SelectItem>;

  scheduleForm: FormGroup;
  resetAddTaskForm: boolean = false;
  resetAddReceiverForm: boolean = false; 
  selectedPlant: SelectItem;
  selectedWorkstation: SelectItem;
  private subscription: Subscription;

  get model() { return <ScheduleViewModel>this.scheduleForm.value };

  constructor(private route: ActivatedRoute, private organizationService: OrganizationService,    
    private plantSearchService: PlantSearchService, private userService: UserService, 
    private smatReceiverService: SmatReceiverService, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.scheduleForm = this.formBuilder.group({ 
      id: [null],
      plantId: [null, Validators.required],
      departmentId: [null, Validators.required],
      workshopId: [null, Validators.required],
      jobId: [null, Validators.required],
      workstationId: [null, Validators.required],
      taskId: [],
      dueDate: [null, Validators.required],
      smatLeaderId: [null, Validators.required],
      smatLeader2Id: [null, NotEqualValidator('smatLeaderId')],
      smatReceiverId: [null, Validators.required],
      smatReceiver2Id: [null, NotEqualValidator('smatReceiverId')]
    });

    this.parentForm.addControl('schedule', this.scheduleForm);

    if(!this.schedule){
      this.schedule = this.route.snapshot.data['schedule'];
    }
    
    if (this.schedule) {
      this.plants = [Plant.toSelectItem(this.schedule.plant)];      
      this.onPlantSelected(this.schedule.plantId);      
      this.onDepartmentSelected(this.schedule.departmentId);
      this.onWorkshopSelected(this.schedule.workshopId);
      this.onJobSelected(this.schedule.jobId);
      this.onWorkstationSelected(this.schedule.workstationId);
      
      let model = ScheduleGet.toScheduleViewModel(this.schedule);
      this.scheduleForm.setValue(model);
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
    this.scheduleForm.controls.departmentId.setValue(undefined);
    this.onDepartmentRemoved();

    this.onOrganizationSelected(plantId, undefined)
    .subscribe(o => this.departments = o);

    this.scheduleForm.controls.smatLeaderId.setValue(undefined);
    this.scheduleForm.controls.smatLeader2Id.setValue(undefined);
    this.userService.search(undefined, plantId)
      .map(users => users.map(u => SmatUser.toSelectItem(u)))
      .subscribe(users => this.smatLeaders = users);

    this.scheduleForm.controls.smatReceiverId.setValue(undefined);
    this.scheduleForm.controls.smatReceiver2Id.setValue(undefined);    
    this.smatReceiverService.getByPlantId(plantId)
      .map(receivers => receivers.map(r => SmatReceiverList.toSelectItem(r)))
      .subscribe(receivers => {
        this.smatReceivers = receivers;
        if(this.model.smatReceiverId || this.model.smatReceiver2Id){
          this.onSmateeChanged();
        }
      });
    
    let plant = this.plants.find(p => p.id == plantId);
    this.selectedPlant = plant;

    this.onPlantChangedRequest.emit(plantId);
  }

  onPlantRemoved() {
    this.onDepartmentRemoved();
    this.scheduleForm.controls.departmentId.setValue(undefined);
    this.scheduleForm.controls.smatLeaderId.setValue(undefined);
    this.scheduleForm.controls.smatLeader2Id.setValue(undefined);
    this.scheduleForm.controls.smatReceiverId.setValue(undefined);
    this.scheduleForm.controls.smatReceiver2Id.setValue(undefined);    
    this.departments = [];
    this.smatLeaders = [];
    this.smatReceivers = [];
    this.onPlantChangedRequest.emit();
  }

  onDepartmentSelected(departmentId: number) {
    this.scheduleForm.controls.workshopId.setValue(undefined);
    this.onWorkshopRemoved();
    this.onOrganizationSelected(undefined, departmentId)
      .subscribe(o => this.workshops = o);
  }

  onDepartmentRemoved() {
    this.onWorkshopRemoved();
    this.scheduleForm.controls.workshopId.setValue(undefined);
    this.workshops = [];
  }

  onWorkshopSelected(workshopId: number) {
    this.scheduleForm.controls.jobId.setValue(undefined);
    this.onJobRemoved();
    this.onOrganizationSelected(undefined, workshopId)
    .subscribe(o => this.jobs = o);
  }

  onWorkshopRemoved() {
    this.onJobRemoved();
    this.scheduleForm.controls.jobId.setValue(undefined);
    this.jobs = [];
  }

  onJobSelected(jobId: number) {
    this.scheduleForm.controls.workstationId.setValue(undefined);
    this.onWorkstationRemoved();
    this.onOrganizationSelected(undefined, jobId)
    .subscribe(o => this.workstations = o);
  }

  onJobRemoved() {
    this.onWorkstationRemoved();
    this.scheduleForm.controls.workstationId.setValue(undefined);    
    this.workstations = [];
  }

  onWorkstationSelected(workstationId: number) {
    this.scheduleForm.controls.taskId.setValue(undefined);
    this.onOrganizationSelected(undefined, workstationId)
    .subscribe(o => this.tasks = o);
  }

  onWorkstationRemoved() {
    this.scheduleForm.controls.taskId.setValue(undefined);
    this.tasks = [];
  }

  onSmateeChanged(){
    let smatees = new Array<SelectItem>();
    if(this.model.smatReceiverId){
      let receiver = this.smatReceivers.find(r => r.id == this.model.smatReceiverId);
      if(receiver){
        smatees.push(receiver);
      }
    }

    if(this.model.smatReceiver2Id){
      let receiver2 = this.smatReceivers.find(r => r.id == this.model.smatReceiver2Id);
      if(receiver2){
        smatees.push(receiver2);
      }
    }
        this.onSmateeChangedRequest.emit(smatees);
  }

  private onOrganizationSelected(plantId: number, organizationId: number): Observable<Array<SelectItem>> {
    return this.organizationService.search(undefined, organizationId, plantId)
      .map(organizations => {
        return organizations.map(o => Organization.toSelectItem(o));
      });
  }

  addTask(workstationId: number){
    let workstation = this.workstations.find(w => w.id === workstationId);
    this.selectedWorkstation = workstation;
    this.addTaskModal.show();
  }

  onTaskAdded(task: Organization){
    if(this.tasks == undefined){
      this.tasks = [];
    }
    this.tasks.unshift(Organization.toSelectItem(task));
  }

  onAddTaskModalHidden(){
    this.resetAddTaskForm = true;
  }

  addSmatReceiver(){
    let plantId = this.scheduleForm.value.plantId;
    let plant = this.plants.find(p => p.id === plantId);
    this.selectedPlant = plant;
    this.addReceiverModal.show();
  }

  onReceiverAdded(receiver: SmatReceiverList){
    if(this.smatReceivers == undefined){
      this.smatReceivers = [];
    }
    this.smatReceivers.unshift(SmatReceiverList.toSelectItem(receiver));
  }

  onAddReceiverModalHidden(){
    this.resetAddReceiverForm = true;
  }
}