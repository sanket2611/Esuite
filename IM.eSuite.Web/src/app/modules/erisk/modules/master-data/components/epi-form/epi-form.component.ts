import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { SelectItem } from '@im-angular/core';
import { EpiGet } from '../../models/epi-get.model';
import { EpiFormService } from './epi-form.service';
import { TranslationService } from '../../../../../../services/translation.service';
import { EpiViewModel } from '../../viewModels/epi.viewModel';
import { LanguageDescriptionViewModel } from '../../../../../shared/viewModels/language-description.viewModel';
import { EpiCategoryList } from '../../../../models/epi-category-list.model';
import { Plant } from '../../../../../organization/models/plant';

@Component({
  selector: 'app-epi-form',
  templateUrl: './epi-form.component.html',
  styleUrls: ['./epi-form.component.less'],
  providers: [EpiFormService]
})
export class EpiFormComponent implements OnInit {
  @ViewChild('addLanguageModal') addLanguageModal: ModalDirective;
  @ViewChild('deleteLanguageModal') deleteLanguageModal: ModalDirective;  
  model: EpiViewModel;  
  resetAddLanguageForm: boolean = false;
  isSaveInProgress: boolean;
  selectedLanguage: LanguageDescriptionViewModel;
  plant : Plant;
  categories: SelectItem[];
  private id: number;
  
  constructor(private epiFormService: EpiFormService, private route: ActivatedRoute, 
    private translationService: TranslationService) { }

  ngOnInit() {

    this.plant = this.route.snapshot.data['plant'];

    this.selectedLanguage = new LanguageDescriptionViewModel();
    this.model = new EpiViewModel();
    this.model.plantId = this.plant.id;
    
    var categories: EpiCategoryList[] = this.route.snapshot.data["categories"];
    if(categories){
      this.categories = categories.map(EpiCategoryList.toSelectItem);
    }

    this.id = +this.route.snapshot.paramMap.get('id');
    if(this.id){ 
      var epi: EpiGet = this.route.snapshot.data['epi'];
      this.model = EpiViewModel.getFromEpiGet(epi);
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
    let epi = this.model.toEpiSave();
    let saveObservable  = this.id? this.epiFormService.updateEpi(this.id, epi)
      : this.epiFormService.createEpi(epi);
  
    saveObservable.finally(() => this.isSaveInProgress = false)
      .subscribe();
  }
}