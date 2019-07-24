import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { ObservationCategoryService } from '../../../../services/observation-category.service';
import { ObservationCategoryList } from '../../../../models/observation-category-list.model';

@Component({
  selector: 'app-observation-category-delete',
  templateUrl: './observation-category-delete.component.html',
  styleUrls: ['./observation-category-delete.component.less']
})
export class ObservationCategoryDeleteComponent implements OnInit {
  @Input()category: ObservationCategoryList;
  @Input()modal: BsModalRef;
  @Output()deletedObservationCategoryRequest = new EventEmitter<number>();
  
  constructor(private observationCategoryService: ObservationCategoryService, private toastrService: ToastrService,
    private translateService: TranslateService) { }

  ngOnInit() {
  }

  onDeleteClicked(){
    this.observationCategoryService.delete(this.category.id)
      .subscribe(response => {
        this.translateService.get("eSMAT.ObservationManagement.SuccessfullyDeleted", this.category)
          .mergeMap(message => this.toastrService.success(message).onHidden)          
          .subscribe(() => {
            this.deletedObservationCategoryRequest.emit(this.category.id);          
            this.modal.hide();
          });
        }, error => {
          this.translateService.get("eSMAT.ObservationManagement.ErrorDeleted", this.category)
            .subscribe(message => this.toastrService.error(message));
        });      
  }
}