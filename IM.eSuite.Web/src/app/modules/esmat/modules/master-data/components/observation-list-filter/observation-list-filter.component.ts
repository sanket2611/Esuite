import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SelectItem, PagedList } from '@im-angular/core';
import { Subscription } from 'rxjs/Subscription';
import { PlantSearchService } from '../../../../../organization/services/plant-search.service';
import { Plant } from '../../../../../organization/models/plant';
import { ObservationListFilterViewModel } from '../../viewModels/observation-list-filter.viewModel';
import { ObservationCategoryService } from '../../../../services/observation-category.service';
import { ObservationCategoryList } from '../../../../models/observation-category-list.model';

@Component({
  selector: 'app-observation-list-filter',
  templateUrl: './observation-list-filter.component.html',
  styleUrls: ['./observation-list-filter.component.less']
})
export class ObservationListFilterComponent implements OnInit, OnDestroy {
  model: ObservationListFilterViewModel = new ObservationListFilterViewModel();
  @Input() filterModel: ObservationListFilterViewModel;
  @Output() filterModelChange = new EventEmitter<ObservationListFilterViewModel>();
  @Output() onFilterRemovedRequest = new EventEmitter<void>(); 
  plants: SelectItem[];
  categories: SelectItem[];  
  private subscription: Subscription;

  constructor(private route: ActivatedRoute, private observationCategoryService: ObservationCategoryService, private plantSearchService: PlantSearchService) { }

  ngOnInit() {
    this.filterModel = new ObservationListFilterViewModel();
    let plants: PagedList<Plant> = this.route.snapshot.data['plants'];
    this.plants = plants.entries.map(p => Plant.toSelectItem(p));
    this.subscription = this.plantSearchService.debounceSearchPlant()
      .subscribe(plants => this.plants = plants);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onPlantSearchChanged(search: string){
    this.plantSearchService.onPlantSearchChanged(search);
  }

  onPlantSelected(plantId: number){
    this.observationCategoryService.getByPlantId(plantId)
      .map(result => result.map(c => ObservationCategoryList.toSelectItem(c)))
      .subscribe(categories => this.categories = categories);
  }

  onObservationSelected(observationCategoryId: number) {
    this.onFilterRemovedRequest.emit();
  }

  onPlantRemoved(){
    this.filterModel.observationCategoryId = null;
    this.onFilterRemovedRequest.emit();
  }

  onObservationSearchClicked() {
    this.filterModelChange.emit(this.model);
  }
}