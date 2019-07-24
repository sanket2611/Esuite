import { Component, OnInit, Input, ViewChild, Output, EventEmitter  } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { AuthorizationService } from '@im-angular/authentication';
import { SelectItem } from '@im-angular/core';
import { LanguageService } from '../../services/language.service';
import { LanguageDescriptionViewModel } from '../../../shared/viewModels/language-description.viewModel';
import { Language } from '../../../shared/models/language.model';
import { MeanOfControlViewModel } from '../../viewModels/mean-of-control.viewModel';
import { map } from 'rxjs/operators';
import { MeanOfControlService } from '../../services/mean-of-control.service';
import { MeanOfControlGet } from '../../models/mean-of-control-get.model';
import { MeanOfControlTypeEnum } from '../../enums/mean-of-control-type.enum';

@Component({
  selector: 'app-risk-add-mean-of-control-modal',
  templateUrl: './risk-add-mean-of-control-modal.component.html',
  styleUrls: ['./risk-add-mean-of-control-modal.component.less']
})
export class RiskAddMeanOfControlModalComponent implements OnInit {
  @Input() modal: BsModalRef;
  private _plantId: number;  
  @Input() get plantId(): number{
    return this._plantId;
  }
  set plantId(value: number){
    this._plantId = value;
    if(!this.model){
      this.model = new MeanOfControlViewModel();
    }
    this.model.plantId = value;
  }

  @Output() meanOfControlCreatedRequest = new EventEmitter<MeanOfControlGet>();

  @ViewChild("descriptionForm") form: HTMLFormElement;
  isSaveInProgress: boolean = false;
  model: MeanOfControlViewModel;
  selectedDescription: LanguageDescriptionViewModel;
  selectedIndex: number;
  categories: SelectItem[];
  languages: SelectItem[];
 
  constructor(private languageService: LanguageService, private toastrService: ToastrService, private translateService: TranslateService, 
    public authorizationService: AuthorizationService, private meanOfControlService: MeanOfControlService) { }

  ngOnInit() {
    this.selectedDescription = new LanguageDescriptionViewModel();
    this.languageService.get().map(result => result.map(l => Language.toSelectItem(l)))
      .subscribe(languages  => this.languages = languages);
    
    this.setMeanOfControlTypes();
  }

  onAddDescriptionClicked(){
    var language = this.languages.find(l => l.id == this.selectedDescription.languageId).text;

    if(this.model.descriptions.some(d => d.languageId == this.selectedDescription.languageId)){
      this.translateService.get("eRisk.RiskForm.LanguageDescriptionAlreadyExists", { language: language }).pipe(
        map(t => this.toastrService.warning(t))
      ).subscribe();
      return;
    }

    this.selectedDescription.language = language;
    
    if(this.selectedIndex == null){      
      this.model.descriptions.push(this.selectedDescription);
    }
    else{
      this.model.descriptions[this.selectedIndex] = this.selectedDescription;
      this.selectedIndex = undefined;
    }
    this.selectedDescription = new LanguageDescriptionViewModel();
    this.form.reset();
  }

  onUpdateClicked(description: LanguageDescriptionViewModel, index: number){
    this.selectedDescription = Object.assign(new LanguageDescriptionViewModel(), description);
    this.selectedIndex = index;
  }

  onDeleteClicked(index: number){
    this.model.descriptions.splice(index, 1);
  }  

  onSubmit(){
    this.isSaveInProgress = true;
    var meanOfControl = this.model.toMeanOfControlSave();
    this.meanOfControlService.create(meanOfControl)      
      .do((result) => {
        this.translateService.get("eRisk.RiskForm.MeanOfControlSuccessfullyCreated").pipe(
          map((message: string) => this.toastrService.success(message).onHidden),
          map(() => {
            var moc = this.model.toMeanOfControlGet();
            moc.id = result.id;
            this.meanOfControlCreatedRequest.emit(moc);
          })
        ).subscribe(() => {
          this.model.type = null;
          this.model.descriptions = [];
          this.modal.hide();
        });
      }, 
      () => {
        this.translateService.get("eRisk.RiskForm.MeanOfControlErrorCreated").pipe(
          map((message: string) => this.toastrService.error(message)))
          .subscribe();
      })
      .finally(() => this.isSaveInProgress = false)     
      .subscribe();
  }

  private setMeanOfControlTypes(){
    this.translateService.get("eRisk.RiskForm.MeanOfControlTypes")
      .subscribe(result => {
        this.categories = [];
        for (let type in MeanOfControlTypeEnum) {
          if (isNaN(Number(type))) {
              var item = new SelectItem();
              item.id = MeanOfControlTypeEnum[type];
              item.text = result[type];
              this.categories.push(item);
          }
        }
      });
  }
}