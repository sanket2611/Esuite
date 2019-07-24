import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule, BsDatepickerModule, AccordionModule } from 'ngx-bootstrap';
import { NgxSelectModule } from 'ngx-select-ex';
import { TranslateModule } from '@ngx-translate/core';
import { IMAngularCoreModule } from '@im-angular/core';
import { ActionFieldsComponent } from './components/action-fields/action-fields.component';
import { LocationFieldsComponent } from './components/location-fields/location-fields.component';
import { TaskAddComponent } from './components/task-add/task-add.component';
import { BaseRootComponent } from './components/base-root/base-root.component';
import { LanguageDescriptionAddComponent } from './components/language-description-add/language-description-add.component';
import { LanguageDescriptionDeleteComponent } from './components/language-description-delete/language-description-delete.component';
import { OrganizationFilterComponent } from './components/organization-filter/organization-filter.component';

@NgModule({
  imports: [    
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    IMAngularCoreModule,
    TranslateModule,
    NgxSelectModule,
    BsDatepickerModule,
    ModalModule,
    AccordionModule.forRoot()
  ],
  declarations: [
    ActionFieldsComponent,
    LocationFieldsComponent,
    TaskAddComponent,
    BaseRootComponent,
    LanguageDescriptionAddComponent,
    LanguageDescriptionDeleteComponent,
    OrganizationFilterComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    ModalModule,
    BsDatepickerModule,
    AccordionModule,
    NgxSelectModule,
    IMAngularCoreModule,
    ActionFieldsComponent,
    LocationFieldsComponent,
    OrganizationFilterComponent,
    TaskAddComponent,
    BaseRootComponent,
    TaskAddComponent,
    LanguageDescriptionAddComponent,
    LanguageDescriptionDeleteComponent
  ]
})
export class SharedModule { }
