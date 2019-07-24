import { Component, OnInit } from '@angular/core';
import { ObservationListFilterViewModel } from '../../viewModels/observation-list-filter.viewModel';

@Component({
  selector: 'app-observation-list',
  templateUrl: './observation-list.component.html',
  styleUrls: ['./observation-list.component.less']
})
export class ObservationListComponent implements OnInit {
  filterModel: ObservationListFilterViewModel = new ObservationListFilterViewModel();

  constructor() {}

  ngOnInit() {
  }

  onFilterRemoved(){
    this.filterModel = new ObservationListFilterViewModel();
  }
}