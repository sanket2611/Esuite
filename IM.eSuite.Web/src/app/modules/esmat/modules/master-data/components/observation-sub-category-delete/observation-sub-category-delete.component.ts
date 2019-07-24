import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { ObservationSubCategoryService } from '../../../../services/observation-sub-category.service';
import { ObservationSubCategoryList } from '../../../../models/observation-sub-category-list.model';

@Component({
  selector: 'app-observation-sub-category-delete',
  templateUrl: './observation-sub-category-delete.component.html',
  styleUrls: ['./observation-sub-category-delete.component.less']
})
export class ObservationSubCategoryDeleteComponent implements OnInit {
  @Input()subCategory: ObservationSubCategoryList;
  @Input()modal: BsModalRef;
  @Output()deletedObservationSubCategoryRequest = new EventEmitter<number>();
  
  constructor(private observationSubCategoryService: ObservationSubCategoryService, private toastrService: ToastrService,
    private translateService: TranslateService) { }

  ngOnInit() {
  }

  onDeleteClicked(){
    this.observationSubCategoryService.delete(this.subCategory.id)
      .subscribe(response => {
        this.translateService.get("eSMAT.ObservationManagement.SuccessfullyDeleted", this.subCategory)
          .mergeMap(message => this.toastrService.success(message).onHidden)          
          .subscribe(() => {
            this.deletedObservationSubCategoryRequest.emit(this.subCategory.id);          
            this.modal.hide();
          });
        }, error => {
          this.translateService.get("eSMAT.ObservationManagement.ErrorDeleted", this.subCategory)
            .subscribe(message => this.toastrService.error(message));
        });      
  }
}