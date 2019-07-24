import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { ObservationListFilterViewModel } from '../../viewModels/observation-list-filter.viewModel';
import { AbstractDataTable, PagedList } from '@im-angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { PageSizeService } from '../../../../../../services/page-size.service';
import { ObservationCategoryService } from '../../../../services/observation-category.service';
import { ListRequestService } from '../../../../../../services/list-request.service';
import { ObservationCategoryList } from '../../../../models/observation-category-list.model';
import { ObservationCategoryListRequest } from '../../../../models/observation-category-list-request.model';

@Component({
  selector: 'app-observation-category-table',
  templateUrl: './observation-category-table.component.html',
  styleUrls: ['./observation-category-table.component.less']
})
export class ObservationCategoryTableComponent extends AbstractDataTable<ObservationCategoryList> implements OnInit {
  private _filterModel: ObservationListFilterViewModel;
  selectedCategory: ObservationCategoryList;

  @ViewChild('deleteObservationCategoryModal') deleteObservationCategoryModal: ModalDirective;
  @Output() filterModelChange = new EventEmitter<ObservationListFilterViewModel>();
  
  @Input() set filterModel(value: ObservationListFilterViewModel){    
    this._filterModel = value;
    if(value && value.plantId){      
      this.loadPage(1);
    }
  }
  get filterModel(): ObservationListFilterViewModel {
    return this._filterModel;
  }

  constructor(private pageSizeService: PageSizeService, private observationCategoryService: ObservationCategoryService,
    private listRequestService: ListRequestService) { 
    super(pageSizeService);
  }

  ngOnInit() { 
    this.data = new PagedList();
    this.data.entries = new Array();    
    this.updatePagerVm(1);  
  }

  loadPage(i: number) {
    let request = this.getListRequest(i);      
    this.observationCategoryService.list(request)
      .subscribe(categories => {          
        this.data = categories;
        this.updatePagerVm(i);
      });        
  }

  onSubCategoryClicked(categoryId: number){
    this.filterModel.observationCategoryId = categoryId;    
  }

  onDeleteClicked(category: ObservationCategoryList){
    this.selectedCategory = category;
    this.deleteObservationCategoryModal.show();
  }

  onObservationCategoryDeleted(categoryId: number){
    this.selectedCategory = undefined;
    let index = this.data.entries.findIndex(c => c.id == categoryId);
    this.data.entries.splice(index, 1);
  }

  private getListRequest(pageNumber: number): ObservationCategoryListRequest {
    let request = this.listRequestService.getListRequest(ObservationCategoryListRequest, pageNumber, this.pageSizeVm.pageSize, this.sortVm);

    if(this.filterModel){
      request.plantId = this.filterModel.plantId;      
    }

    return request;
  }
}