import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { HazardGet } from '../../models/hazard-get.model';
import { HazardFormService } from './hazard-form.service';
import { TranslationService } from '../../../../../../services/translation.service';
import { HazardViewModel } from '../../viewModels/hazard.viewModel';
import { LanguageDescriptionViewModel } from '../../../../../shared/viewModels/language-description.viewModel';
import { Plant } from '../../../../../organization/models/plant';

@Component({
  selector: 'app-hazard-form',
  templateUrl: './hazard-form.component.html',
  styleUrls: ['./hazard-form.component.less'],
  providers: [HazardFormService]
})
export class HazardFormComponent implements OnInit {
  @ViewChild('addLanguageModal') addLanguageModal: ModalDirective;
  @ViewChild('deleteLanguageModal') deleteLanguageModal: ModalDirective;  
  model: HazardViewModel;  
  resetAddLanguageForm: boolean = false;
  isSaveInProgress: boolean;
  selectedLanguage: LanguageDescriptionViewModel;
  plant : Plant;
  private id: number;

  constructor(private hazardFormService: HazardFormService, private route: ActivatedRoute, 
    private translationService: TranslationService) { }

  ngOnInit() {    
    this.selectedLanguage = new LanguageDescriptionViewModel();

    this.id = +this.route.snapshot.paramMap.get('id');
    
    this.plant = this.route.snapshot.data['plant'];

    if(this.id){ 
      var hazard: HazardGet = this.route.snapshot.data['hazard'];
     
      this.model = HazardViewModel.getFromHazardGet(hazard);
    }
    else {
      this.model = new HazardViewModel();
      this.model.plantId = this.plant.id;
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
    let hazard = this.model.toHazardSave();
    let saveObservable  = this.id? this.hazardFormService.updateHazard(this.id, hazard)
      : this.hazardFormService.createHazard(hazard);
  
    saveObservable.finally(() => this.isSaveInProgress = false)
      .subscribe();
  }
}