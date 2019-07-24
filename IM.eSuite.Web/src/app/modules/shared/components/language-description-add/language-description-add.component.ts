import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { SelectItem } from '@im-angular/core';
import { AuthorizationService } from '@im-angular/authentication';
import { LanguageDescriptionViewModel } from '../../viewModels/language-description.viewModel';
import { Language } from '../../models/language.model';

@Component({
  selector: 'app-language-description-add',
  templateUrl: './language-description-add.component.html',
  styleUrls: ['./language-description-add.component.less']
})
export class LanguageDescriptionAddComponent implements OnInit {
  @ViewChild("addLanguageForm") form: HTMLFormElement;
  @Output() resetChange = new EventEmitter<boolean>(true);  
  @Output() addedLanguageRequest = new EventEmitter<LanguageDescriptionViewModel>();
  @Input() model: LanguageDescriptionViewModel;
  @Input() modal: BsModalRef;

  private _reset: boolean;
  @Input() set reset(value: boolean){
    this._reset = value;
    if(this._reset){
      this.form.reset();
      this.resetChange.emit(false);
    }    
  }
  get reset(): boolean {
    return this._reset;
  }  
  
  languages: SelectItem[];
  
  constructor(private route: ActivatedRoute, public authorizationService: AuthorizationService) { }

  ngOnInit() {
    let languages: Language[] = this.route.snapshot.data['languages'];
    this.languages = languages.map(l => Language.toSelectItem(l));
  }

  onLanguageSelected(languageId: number){
    this.model.language = this.languages.find(l => l.id == languageId).text;
  }

  onSubmit(){
    this.addedLanguageRequest.emit(this.model);
    this.modal.hide();
  }
}