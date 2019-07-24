import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { LanguageDescriptionViewModel } from '../../viewModels/language-description.viewModel';

@Component({
  selector: 'app-language-description-delete',
  templateUrl: './language-description-delete.component.html',
  styleUrls: ['./language-description-delete.component.less']
})
export class LanguageDescriptionDeleteComponent implements OnInit {
  @Input()language: LanguageDescriptionViewModel;
  @Input()modal: BsModalRef;
  @Output()deletedLanguageRequest = new EventEmitter<LanguageDescriptionViewModel>();
  
  constructor() { }

  ngOnInit() {
  }

  onDeleteClicked(){
    this.deletedLanguageRequest.emit(this.language);
    this.modal.hide();
  }
}