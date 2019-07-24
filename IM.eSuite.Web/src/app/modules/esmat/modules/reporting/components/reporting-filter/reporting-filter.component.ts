import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SelectItem, PagedList } from '@im-angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { TranslateService } from '@ngx-translate/core';
import { PlantSearchService } from '../../../../../organization/services/plant-search.service';
import { OrganizationService } from '../../../../../organization/services/organization.service';
import { ReportTypeService } from '../../services/report-type.service';
import { ObservationTypeService } from '../../../../services/observation-type.service';
import { ObservationCategoryService } from '../../../../services/observation-category.service';
import { ReportTypeEnum } from '../../enums/report-type-enum';
import { Plant } from '../../../../../organization/models/plant';
import { Organization } from '../../../../../organization/models/organization';
import { ObservationType } from '../../../../models/observation-type.model';
import { ReportingFilterViewModel } from '../../viewModels/reporting-filter.viewModel';
import { ObservationCategoryListRequest } from '../../../../models/observation-category-list-request.model';
import { ObservationCategoryList } from '../../../../models/observation-category-list.model';

@Component({
  selector: 'app-reporting-filter',
  templateUrl: './reporting-filter.component.html',
  styleUrls: ['./reporting-filter.component.less'],
  providers: [ReportTypeService]
})
export class ReportingFilterComponent implements OnInit, OnDestroy {
  @Input() model: ReportingFilterViewModel;
  @Output() onReportingFilteredRequest : EventEmitter<ReportingFilterViewModel> = new EventEmitter<ReportingFilterViewModel>();
  @Output() onFilterRemovedRequest = new EventEmitter<void>();  
  reports: Array<SelectItem>;
  plants: Array<SelectItem>;
  departments: Array<SelectItem>;
  workshops: Array<SelectItem>;
  jobs: Array<SelectItem>;
  workstations: Array<SelectItem>;
  tasks: Array<SelectItem>;
  observationTypes: Array<SelectItem>;
  categories: Array<SelectItem>;
  months: Array<SelectItem>;
  private subscription: Subscription;
  ReportTypeEnum = ReportTypeEnum;
  
  constructor(private route: ActivatedRoute, private plantSearchService: PlantSearchService,
    private organizationService: OrganizationService, private reportTypeService: ReportTypeService,
    private observationTypeService: ObservationTypeService, private observationCategoryService: ObservationCategoryService,
    private translateService: TranslateService) { }

  ngOnInit() {
    this.reports = this.reportTypeService.get();    
    
    let plants: PagedList<Plant> = this.route.snapshot.data['plants'];
    this.plants = plants.entries.map(p => Plant.toSelectItem(p));
    this.subscription = this.plantSearchService.debounceSearchPlant()
      .subscribe(result => this.plants = result);    

    let endDate = new Date();
    let startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 1);
    this.model.dateRange = new Array<Date>(startDate, endDate);

    this.months = new Array<SelectItem>();
    let locale = this.translateService.getBrowserLang();
    for (let index = (new Date().getMonth() - 2) ; index < (new Date().getMonth() + 1); index++) {
      //In Javascript, modulo can be negative, we need to adjust to have only positive modulo.
      let monthNumber = (index % 12 + 12) % 12;      
      let item = new SelectItem();
      item.id = monthNumber + 1;      
      let date = new Date();
      date.setDate(1);
      date.setMonth(index);
      item.text = date.toLocaleString(locale, { month: "long" });
      this.months.push(item);      
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onReportSelected(){
    if((this.model.report == ReportTypeEnum.ObservationByCategory || this.model.report == ReportTypeEnum.ObservationByOrganization) 
      && !this.observationTypes){
      this.observationTypeService.get()
      .subscribe(types => this.observationTypes = types.map(t => ObservationType.toSelectItem(t)));
    }
  }

  onPlantSearchChanged(search: string){
    this.plantSearchService.onPlantSearchChanged(search);
  }

  onPlantSelected(plantId: number) {
    this.onOrganizationSelected(plantId, undefined).subscribe(d => this.departments = d);    
  }

  onDepartmentSelected(departmentId: number){    
    this.onOrganizationSelected(undefined, departmentId).subscribe(w => this.workshops = w);
  }

  onWorkshopSelected(workshopId: number){
    this.onOrganizationSelected(undefined, workshopId).subscribe(j => this.jobs = j);
  }

  onJobSelected(jobId: number){
    this.onOrganizationSelected(undefined, jobId).subscribe(w => this.workstations = w);
  }

  onWorkstationSelected(id: number){
    this.onOrganizationSelected(undefined, id).subscribe(t => this.tasks = t);
  }

  onReportRemoved(){
    this.onFilterRemovedRequest.emit();
  }

  onPlantRemoved(){    
    this.model.departmentId = undefined;
    this.onDepartmentRemoved();
    
    if(!this.model.dateRange || !this.model.dateRange[0] || !this.model.dateRange[1]){
      this.onFilterRemovedRequest.emit();
    }    
  }
  
  onDepartmentRemoved(){    
    this.model.workshopId = undefined;
    this.onWorkshopRemoved();
  }

  onWorkshopRemoved(){
    this.model.jobId = undefined;
    this.onJobRemoved();
  }

  onJobRemoved(){
    this.model.workstationId = undefined;
    this.onWorkstationRemoved(); 
  }

  onWorkstationRemoved(){
    this.model.taskId = undefined;    
  }

  onDateRangeChanged(dateRange: Date[]){    
    if(!this.model.plantId && (!dateRange && this.model.dateRange)){
      this.onFilterRemovedRequest.emit();
    }

    this.model.dateRange = dateRange;
  }

  onTypeSelected(){
    this.categories = undefined;
    this.onTypeRemoved();
    if(!this.model.observationTypeId){
      return;
    }

    let request = new ObservationCategoryListRequest();
    request.observationTypeId = this.model.observationTypeId;
    request.plantId = this.model.plantId;
    request.pageNumber = 1;
    request.pageSize = 50;
    this.observationCategoryService.list(request)
      .subscribe(result => this.categories = result.entries.map(oc => ObservationCategoryList.toSelectItem(oc)));
  }

  onTypeRemoved(){
    this.model.observationCategoryId = undefined;
  }

  onSubmit(){
    this.onReportingFilteredRequest.emit(this.model);
  }

  private onOrganizationSelected(plantId: number, parentId: number): Observable<Array<SelectItem>>{
    return this.organizationService.search(undefined, parentId, plantId).map(organizations => {
      return organizations.map(o => Organization.toSelectItem(o));      
    });    
  }
}