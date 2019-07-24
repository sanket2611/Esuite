import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { SelectItem } from '@im-angular/core';
import { ObservationCategoryFormService } from './observation-category-form.service';
import { Plant } from '../../../../../organization/models/plant';
import { ObservationType } from '../../../../models/observation-type.model';
import { LanguageDescriptionViewModel } from '../../../../../shared/viewModels/language-description.viewModel';
import { ObservationCategoryViewModel } from '../../../../viewModels/observation-category.viewModel';
import { ObservationCategoryGet } from '../../../../models/observation-category-get.model';

@Component({
  selector: 'app-observation-category-form',
  templateUrl: './observation-category-form.component.html',
  styleUrls: ['./observation-category-form.component.less'],
  providers: [ObservationCategoryFormService]
})
export class ObservationCategoryFormComponent implements OnInit {
  @ViewChild('addLanguageModal') addLanguageModal: ModalDirective;
  @ViewChild('deleteLanguageModal') deleteLanguageModal: ModalDirective;
  resetAddLanguageForm: boolean = false;
  plant: Plant;
  observationTypes: Array<SelectItem>;
  model: ObservationCategoryViewModel;  
  isSaveInProgress: boolean;
  selectedLanguage: LanguageDescriptionViewModel;
  private id: number; 

  constructor(private route: ActivatedRoute, private observationCategoryFormService: ObservationCategoryFormService) { }

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
        this.model = new ObservationCategoryViewModel();        
        this.id = +params.get('id');

        if(this.id){
          let observationCategory: ObservationCategoryGet = this.route.snapshot.data['observationCategory'];
          this.model = ObservationCategoryGet.toObservationCategoryViewModel(observationCategory);
        }
        this.model.plantId = +params.get('plantId');
    });    
    
    this.selectedLanguage = new LanguageDescriptionViewModel();
    this.plant = this.route.snapshot.data['plant'];    
    let observationTypes: ObservationType[] = this.route.snapshot.data['observationTypes'];
    this.observationTypes = observationTypes.map(ot => ObservationType.toSelectItem(ot)); 
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
    let category = this.model.toObservationCategorySave();
    let saveObservable  = this.id? this.observationCategoryFormService.updateObservationCategory(this.id, category)
      : this.observationCategoryFormService.createObservationCategory(category);
  
    saveObservable.finally(() => this.isSaveInProgress = false)
      .subscribe();
  }
}