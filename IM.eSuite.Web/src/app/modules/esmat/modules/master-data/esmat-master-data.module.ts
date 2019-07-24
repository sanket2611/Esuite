import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { EsmatMasterDataRoutingModule } from './esmat-master-data-routing.module';
import { EsmatModule } from '../../esmat.module';

import { SmatReceiversResolve } from './resolvers/smat-receivers.resolve';
import { SmatReceiverUpdateResolve } from './resolvers/smat-receiver.update.resolve';
import { EmployeeTypesResolve } from '../../resolvers/employee-types.resolve';
import { LanguagesResolve } from './resolvers/languages.resolve';
import { ObservationCategoryUpdateResolve } from './resolvers/observation-category.update.resolve';
import { ObservationCategoryGetResolve } from './resolvers/observation-category-get.resolve';
import { ObservationSubCategoryGetResolve } from './resolvers/observation-sub-category-get.resolve';

import { SmatReceiverListComponent } from './components/smat-receiver-list/smat-receiver-list.component';
import { SmatReceiverFilterComponent } from './components/smat-receiver-filter/smat-receiver-filter.component';
import { SmatReceiverFormComponent } from './components/smat-receiver-form/smat-receiver-form.component';
import { SmatReceiverDeleteComponent } from './components/smat-receiver-delete/smat-receiver-delete.component';
import { SmatReceiverImportComponent } from './components/smat-receiver-import/smat-receiver-import.component';
import { ObservationListComponent } from './components/observation-list/observation-list.component';
import { ObservationCategoryFormComponent } from './components/observation-category-form/observation-category-form.component';
import { ObservationListFilterComponent } from './components/observation-list-filter/observation-list-filter.component';
import { ObservationCategoryTableComponent } from './components/observation-category-table/observation-category-table.component';
import { ObservationSubCategoryTableComponent } from './components/observation-sub-category-table/observation-sub-category-table.component';
import { ObservationCategoryDeleteComponent } from './components/observation-category-delete/observation-category-delete.component';
import { ObservationSubCategoryDeleteComponent } from './components/observation-sub-category-delete/observation-sub-category-delete.component';
import { ObservationSubCategoryFormComponent } from './components/observation-sub-category-form/observation-sub-category-form.component';

@NgModule({
  imports: [
    SharedModule,
    EsmatMasterDataRoutingModule,
    EsmatModule
  ],
  declarations: [
    SmatReceiverListComponent,
    SmatReceiverFilterComponent,
    SmatReceiverFormComponent,
    SmatReceiverDeleteComponent,
    SmatReceiverImportComponent,
    ObservationListComponent,
    ObservationCategoryFormComponent,
    ObservationListFilterComponent,
    ObservationCategoryTableComponent,
    ObservationSubCategoryTableComponent,
    ObservationCategoryDeleteComponent,
    ObservationSubCategoryDeleteComponent,
    ObservationSubCategoryFormComponent    
  ],
  providers: [
    SmatReceiversResolve,
    SmatReceiverUpdateResolve,
    EmployeeTypesResolve,
    LanguagesResolve,
    ObservationCategoryUpdateResolve,
    ObservationCategoryGetResolve,
    ObservationSubCategoryGetResolve
  ]
})
export class EsmatMasterDataModule { }