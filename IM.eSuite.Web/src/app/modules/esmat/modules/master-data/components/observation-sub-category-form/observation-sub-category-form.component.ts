import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ObservationSubCategoryFormService } from './observation-sub-category-form.service';
import { TranslationService } from '../../../../../../services/translation.service';
import { ObservationSubCategoryViewModel } from '../../../../viewModels/observation-subCategory.viewModel';
import { LanguageDescriptionViewModel } from '../../../../../shared/viewModels/language-description.viewModel';
import { ObservationCategoryGet } from '../../../../models/observation-category-get.model';
import { ObservationSubCategoryGet } from '../../../../models/observation-sub-category-get.model';

@Component({
  selector: 'app-observation-sub-category-form',
  templateUrl: './observation-sub-category-form.component.html',
  styleUrls: ['./observation-sub-category-form.component.less'],
  providers: [ObservationSubCategoryFormService]
})
export class ObservationSubCategoryFormComponent implements OnInit {
  @ViewChild('addLanguageModal') addLanguageModal: ModalDirective;
  @ViewChild('deleteLanguageModal') deleteLanguageModal: ModalDirective;
  resetAddLanguageForm: boolean = false;
  model: ObservationSubCategoryViewModel;
  isSaveInProgress: boolean;
  selectedLanguage: LanguageDescriptionViewModel;
  private id: number;

  constructor(private route: ActivatedRoute, private observationSubCategoryFormService: ObservationSubCategoryFormService,
    private translationService: TranslationService) { 
  }

  ngOnInit() {
    this.model = new ObservationSubCategoryViewModel();
    this.selectedLanguage = new LanguageDescriptionViewModel();

    this.route.paramMap.subscribe(params => {
      
      this.id = +params.get('id');

      if(this.id){
        let observationSubCategory: ObservationSubCategoryGet = this.route.snapshot.data['observationSubCategory'];
        this.model = ObservationSubCategoryGet.toObservationSubCategoryViewModel(observationSubCategory);
      }
      
      this.model.plantId = +params.get('plantId');
      this.model.observationCategoryId = +params.get('categoryId');
    });

    let observationCategory: ObservationCategoryGet = this.route.snapshot.data['observationCategory'];
    if(observationCategory){
      this.model.plant = observationCategory.plant;
      this.model.plantId = observationCategory.plant.id;
      this.model.category = this.translationService.get(observationCategory.descriptions);
    }
  }

  onAddLanguageClicked(){
    this.addLanguageModal.show();
  }

  onUpdateClicked(languageDescription: LanguageDescriptionViewModel){
    this.selectedLanguage = Object.assign({}, languageDescription);
    this.addLanguageModal.show();
  }

  onLanguageAdded(languageDescription: LanguageDescriptionViewModel){
    let index = this.model.descriptions.findIndex(d => d.languageId == languageDescription.languageId);    
    if(index !== -1 ){
      this.model.descriptions[index] = Object.assign({}, languageDescription);
    }
    else {
      this.model.descriptions.push(Object.assign({}, languageDescription));      
      this.addLanguageModal.show();
    }
  }

  onDeleteClicked(languageDescription: LanguageDescriptionViewModel){
    this.selectedLanguage = Object.assign({}, languageDescription);
    this.deleteLanguageModal.show();
  }

  onLanguageDeleted(languageDescription: LanguageDescriptionViewModel){
    let index = this.model.descriptions.findIndex(d => d.languageId == languageDescription.languageId);
    this.model.descriptions.splice(index, 1);
    this.selectedLanguage = new LanguageDescriptionViewModel();
  }

  onAddLanguageModalHidden(){
    this.resetAddLanguageForm = true;
  }

  onSubmit(){
    this.isSaveInProgress = true;
    let subCategory = this.model.toObservationSubCategorySave();    
    let saveObservable  = this.id? this.observationSubCategoryFormService.updateObservationSubCategory(this.id, subCategory)
      : this.observationSubCategoryFormService.createObservationSubCategory(subCategory);
  
    saveObservable.finally(() => this.isSaveInProgress = false)
      .subscribe();
  }
}