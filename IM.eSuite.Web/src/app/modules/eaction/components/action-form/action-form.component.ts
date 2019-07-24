import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SelectItem } from '@im-angular/core';
import { AuthorizationService } from '@im-angular/authentication';
import { ActionFormService } from './action-form.service';
import { SubCategoryService } from '../../services/sub-category.service';
import { ResponsibleSelectItem } from '../../../shared/models/responsible-select-item.model';
import { StatusEnum } from '../../enums/status.enum';
import { ActionPlanGet } from '../../models/action-plan-get.model';
import { ActionPlanViewModel } from '../../viewModels/action-plan.viewModel';
import { LocationGet } from '../../models/location-get.model';
import { CategoryGet } from '../../models/category-get.model';
import { SubCategoryGet } from '../../models/subcategory-get.model';

@Component({
  selector: 'app-action-form',
  templateUrl: './action-form.component.html',
  styleUrls: ['./action-form.component.less'],
  providers : [ActionFormService]
})
export class ActionFormComponent implements OnInit {
  isSaveInProgress: boolean;  
  id: number;
  plantId: number;
  location: LocationGet;
  actionForm: FormGroup;
  statuses: Array<string>;
  responsibles: Array<ResponsibleSelectItem>;
  feedbackEmails: Array<SelectItem>;
  categories: Array<SelectItem>;
  subcategories: Array<SelectItem>;
  StatusEnum = StatusEnum;

  get isEditMode(): boolean {
    return this.route.snapshot.paramMap.has('id');
  }

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private actionFormService: ActionFormService,
    private subCategoryService: SubCategoryService, public authorizationService: AuthorizationService) { }

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');

    this.actionForm = this.formBuilder.group({
      categoryId: [null, Validators.required],
      subCategoryId: [],
      responsible: [null, Validators.required],
      responsibleFirstName: [null, Validators.required],
      responsibleLastName: [null, Validators.required],
      status: [StatusEnum[StatusEnum.Opened], Validators.required],
      description: [null, Validators.required],
      actionTaken: [null, Validators.required],
      dueDate: [null, Validators.nullValidator],
      initialDueDate: [null, Validators.required],
      completionDate: [],
      closingDate: [],
      comment: [],
      feedbackEmails: []
    });

    let categories: Array<CategoryGet> = this.route.snapshot.data['categories'];
    this.categories = categories.map(c => CategoryGet.toSelectItem(c));

    let action = <ActionPlanGet>this.route.snapshot.data['action'];
    if(action){
      if(action.categoryId){
        this.onCategorySelected(action.categoryId);
      }

      this.actionForm.setValue(ActionPlanViewModel.getFromActionPlanGet(action));
      this.location = action.location;
      this.feedbackEmails = action.feedbackEmails.map(email => {
        let e = new SelectItem();
        e.text = email;
        return e;
      });
    }
  }

  onPlantChanged(plantId: number){
    this.plantId = plantId;
  }

  onCategorySelected(categoryId: number){
    this.subCategoryService.list(categoryId).subscribe(result => {
      this.subcategories = result.map(sc => SubCategoryGet.toSelectItem(sc));
    }); 
  }

  onCategoryRemoved(){
    this.actionForm.controls.subcategoryId.setValue(undefined);
    this.subcategories = [];
  }

  onSubmit(){    
    this.isSaveInProgress = true;
    this.actionFormService.save(this.id, this.actionForm.value)
      .finally(() => this.isSaveInProgress = false)
      .subscribe();
  }
}