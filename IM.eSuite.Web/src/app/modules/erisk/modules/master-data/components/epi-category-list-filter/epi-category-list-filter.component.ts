import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SelectItem } from '@im-angular/core';
import { EpiCategoryFilterViewModel } from '../../viewModels/epi-category-filter.viewModel';
import { EpiCategoryList } from '../../../../models/epi-category-list.model';
import { Plant } from '../../../../../organization/models/plant';

@Component({
  selector: 'app-epi-category-list-filter',
  templateUrl: './epi-category-list-filter.component.html',
  styleUrls: ['./epi-category-list-filter.component.less']
})
export class EpiCategoryListFilterComponent implements OnInit {

  epiCategoryFilter: EpiCategoryFilterViewModel = new EpiCategoryFilterViewModel();
  categories: SelectItem[];
  plants: SelectItem[];
  @Output() filterModelChange = new EventEmitter<EpiCategoryFilterViewModel>();

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    var categories: Array<EpiCategoryList> = this.route.snapshot.data["epiCategories"];
    this.categories = categories.map(e => EpiCategoryList.toSelectItem(e));

    let plantList = this.route.snapshot.data['plants'];
    this.plants = plantList.entries.map(p => Plant.toSelectItem(p));
  }

  onCategoryRemoved() {
    this.epiCategoryFilter.epiCategoryId = null;
    if (this.epiCategoryFilter.plantId) {
      this.filterModelChange.emit(this.epiCategoryFilter);
    }
  }

  onPlantRemoved()
  {
    this.epiCategoryFilter.plantId = null;
    this.filterModelChange.emit(this.epiCategoryFilter);
  }

  onEpiSearchClicked() {
    this.filterModelChange.emit(this.epiCategoryFilter);
  }
}