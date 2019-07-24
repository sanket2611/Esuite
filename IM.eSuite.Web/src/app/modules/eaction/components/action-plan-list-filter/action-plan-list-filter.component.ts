import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActionPlanFilterViewModel } from '../../viewModels/action-plan-filter.viewModel';
import { SelectItem, PagedList } from '@im-angular/core';
import { Subscription } from 'rxjs/Subscription';
import { PlantSearchService } from '../../../organization/services/plant-search.service';
import { SourceService } from '../../services/source.service';
import { Plant } from '../../../organization/models/plant';

@Component({
  selector: 'app-action-plan-list-filter',
  templateUrl: './action-plan-list-filter.component.html',
  styleUrls: ['./action-plan-list-filter.component.less']
})
export class ActionPlanListFilterComponent implements OnInit, OnDestroy {
  @Input() model: ActionPlanFilterViewModel;
  @Output() onActionPlanFilteredRequest: EventEmitter<ActionPlanFilterViewModel> = new EventEmitter<ActionPlanFilterViewModel>();
  @Output() onActionPlanFilterRemovedRequest: EventEmitter<void> = new EventEmitter<void>();
  plants: Array<SelectItem>;
  sources: Array<SelectItem>;
  private subscription: Subscription;

  constructor(private route: ActivatedRoute, private plantSearchService: PlantSearchService, 
    private sourceService: SourceService) { }

  ngOnInit() {
    let plantList: PagedList<Plant> = this.route.snapshot.data['plants'];
    this.plants = plantList.entries.map(p => Plant.toSelectItem(p));

    this.sources = this.sourceService.get();
    this.subscription = this.plantSearchService.debounceSearchPlant()
      .subscribe(result => this.plants = result);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();    
  }

  onPlantSearchChanged(search: string){
    this.plantSearchService.onPlantSearchChanged(search);
  }

  onPlantRemoved(){
    if(!this.model.source && !this.model.search){
      this.onActionPlanFilterRemovedRequest.emit();
    }
  }

  onSourceRemoved(){
    if(!this.model.plantId && !this.model.search){
      this.onActionPlanFilterRemovedRequest.emit();
    }
  }

  onSearchBlured(){
    if(!this.model.plantId && !this.model.source && !this.model.search){
      this.onActionPlanFilterRemovedRequest.emit();
    }
  }

  onSearchClicked(){
    this.onActionPlanFilteredRequest.emit(this.model);
  }
}