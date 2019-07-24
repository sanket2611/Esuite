import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SelectItem, PagedList } from '@im-angular/core';
import { Subscription } from 'rxjs/Subscription';
import { PlantSearchService } from '../../../../../organization/services/plant-search.service';
import { EmployeeTypeService } from '../../../../services/employee-type.service';
import { EmployeeType } from '../../../../models/employee-type.model';
import { SmatReceiverFilter } from '../../models/smat-receiver-filter.model';
import { Plant } from '../../../../../organization/models/plant';

@Component({
  selector: 'app-smat-receiver-filter',
  templateUrl: './smat-receiver-filter.component.html',
  styleUrls: ['./smat-receiver-filter.component.less']
})
export class SmatReceiverFilterComponent implements OnInit, OnDestroy {  
  @Output()onSmatReceiverFilteredRequest = new EventEmitter<SmatReceiverFilter>();
  @Output()onFilterRemovedRequest = new EventEmitter<void>(); 
  plants: Array<SelectItem>;  
  employeeTypes: Array<SelectItem>;
  smatReceiverFilter: SmatReceiverFilter = new SmatReceiverFilter();
  private subscription: Subscription;

  constructor(private route: ActivatedRoute, private plantSearchService: PlantSearchService, private employeeTypeService: EmployeeTypeService) { }

  ngOnInit() {
    let plants: PagedList<Plant> = this.route.snapshot.data['plants'];
    this.plants = plants.entries.map(p => Plant.toSelectItem(p));
    this.subscription = this.plantSearchService.debounceSearchPlant()
      .subscribe(result => this.plants = result);

    let employeeTypes: EmployeeType[] = this.route.snapshot.data['employeeTypes'];
    this.employeeTypes = employeeTypes.map(et => EmployeeType.toSelectItem(et));    
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  onPlantSearchChanged(search: string){
    this.plantSearchService.onPlantSearchChanged(search);
  }

  onSmatReceiverSearchClicked(){
    this.onSmatReceiverFilteredRequest.emit(this.smatReceiverFilter);
  }

  onNameChanged(event: Event)
  {
    this.smatReceiverFilter.name = (<HTMLInputElement>event.target).value;
    this.onFilterRemoved();
  }

  onFilterRemoved(){    
    if(!this.smatReceiverFilter.plantId && !this.smatReceiverFilter.employeeTypeId 
      && !this.smatReceiverFilter.name)
    {
      this.onFilterRemovedRequest.emit();
    }
  }
}