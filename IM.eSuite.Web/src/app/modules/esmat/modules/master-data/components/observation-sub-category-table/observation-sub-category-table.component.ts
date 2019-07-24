import { Component, OnInit, Input, ViewChild} from '@angular/core';
import { AbstractDataTable, PagedList } from '@im-angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { PageSizeService } from '../../../../../../services/page-size.service';
import { ListRequestService } from '../../../../../../services/list-request.service';
import { ObservationSubCategoryService } from '../../../../services/observation-sub-category.service';
import { ObservationSubCategoryPlantService } from '../../../../services/observation-sub-category-plant.service';
import { ObservationSubCategoryList } from '../../../../models/observation-sub-category-list.model';
import { ObservationSubCategoryListRequest } from '../../../../models/observation-sub-category-list-request.model';
import { ObservationListFilterViewModel } from '../../viewModels/observation-list-filter.viewModel';
import { ObservationSubCategoryPlantSave } from '../../../../models/observation-sub-category-plant-save.model';
import { ObservationCategoryService } from '../../../../services/observation-category.service';

@Component({
  selector: 'app-observation-sub-category-table',
  templateUrl: './observation-sub-category-table.component.html',
  styleUrls: ['./observation-sub-category-table.component.less'],
  providers: [ ObservationSubCategoryPlantService]
})
export class ObservationSubCategoryTableComponent extends AbstractDataTable<ObservationSubCategoryList> implements OnInit {
  public isCategoryStandard: boolean;
  private _filterModel: ObservationListFilterViewModel;
  selectedSubCategory: ObservationSubCategoryList;

  @ViewChild('deleteObservationSubCategoryModal') deleteObservationSubCategoryModal: ModalDirective;
  
  @Input() set filterModel(value: ObservationListFilterViewModel){
    this._filterModel = value;

    if (value && value.observationCategoryId) {
      this.loadPage(1);

      this.observationCategoryService.get(value.observationCategoryId).subscribe(oc => { this.isCategoryStandard = oc.isStandard; });
    }
  }
  get filterModel(): ObservationListFilterViewModel {
    return this._filterModel;
  }

  constructor(private pageSizeService: PageSizeService, private observationSubCategoryService: ObservationSubCategoryService,
    private observationCategoryService: ObservationCategoryService,
    private observationSubCategoryPlantService: ObservationSubCategoryPlantService, private listRequestService: ListRequestService,
    private translateService: TranslateService, private toastrService: ToastrService) {
      super(pageSizeService);
  }

  ngOnInit() {
    this.data = new PagedList();
    this.data.entries = new Array();    
    this.updatePagerVm(1); 
  }

  loadPage(i: number) {
    let request = this.getListRequest(i);      
    this.observationSubCategoryService.list(request)
      .subscribe(subcategories => {          
        this.data = subcategories;
        this.updatePagerVm(i);
      });        
  }

  onActiveChanged(subCategory: ObservationSubCategoryList){
    let model = new ObservationSubCategoryPlantSave(subCategory.id, this._filterModel.plantId);
    
    let observable = !subCategory.isActive? this.observationSubCategoryPlantService.create(model):
      this.observationSubCategoryPlantService.delete(this._filterModel.plantId, subCategory.id);
    
    observable.subscribe(
        () => {
          this.translateService.get("eSMAT.ObservationManagement.SuccessfullyStatusUpdated")
            .subscribe(message => this.toastrService.success(message));
        },
        () => {
          this.translateService.get("eSMAT.ObservationManagement.ErrorUpdated")
            .subscribe(message => { 
              this.toastrService.error(message).onHidden.subscribe(() => subCategory.isActive = !subCategory.isActive);              
            });
        }
      );
  }

  onDeleteClicked(subCategory: ObservationSubCategoryList){
    this.selectedSubCategory = subCategory;
    this.deleteObservationSubCategoryModal.show();
  }

  onObservationSubCategoryDeleted(subCategoryId: number){
    this.selectedSubCategory = undefined;
    let index = this.data.entries.findIndex(sc => sc.id == subCategoryId);
    this.data.entries.splice(index, 1);
  }

  private getListRequest(pageNumber: number): ObservationSubCategoryListRequest {
    let request = this.listRequestService.getListRequest(ObservationSubCategoryListRequest, pageNumber, this.pageSizeVm.pageSize, this.sortVm);

    if(this.filterModel && this.filterModel.plantId){
      request.plantId = this.filterModel.plantId;      
    }

    if(this.filterModel && this.filterModel.observationCategoryId){
      request.observationCategoryId = this.filterModel.observationCategoryId;      
    }

    return request;
  }
}