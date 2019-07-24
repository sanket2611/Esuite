import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { EriskMasterDataRoutingModule } from './erisk-master-data-routing.module';
import { HazardListComponent } from './components/hazard-list/hazard-list.component';
import { HazardDeleteComponent } from './components/hazard-delete/hazard-delete.component';
import { HazardFormComponent } from './components/hazard-form/hazard-form.component';
import { HazardGetResolve } from './resolvers/hazard-get.resolve';
import { EpiListComponent } from './components/epi-list/epi-list.component';
import { EpiCategoryListFilterComponent } from './components/epi-category-list-filter/epi-category-list-filter.component';
import { EpiDeleteComponent } from './components/epi-delete/epi-delete.component';
import { EpiFormComponent } from './components/epi-form/epi-form.component';
import { EpiResolve } from './resolvers/epi.resolve';
import { EpiGetResolve } from './resolvers/epi-get.resolve';
import { EpiCategoriesResolve } from './resolvers/epi-categories.resolve';
import { LanguagesResolve } from './resolvers/languages.resolve';
import { PlantGetResolve } from './resolvers/plant.get.resolve';


@NgModule({
  imports: [
    SharedModule,
    EriskMasterDataRoutingModule
  ],
  declarations: [
    HazardListComponent,
    HazardDeleteComponent,
    HazardFormComponent,
    EpiListComponent,
    EpiCategoryListFilterComponent,
    EpiDeleteComponent,
    EpiFormComponent
  ],
  providers:[
    HazardGetResolve,
    LanguagesResolve,
    EpiCategoriesResolve,
    EpiResolve,
    EpiGetResolve,
    PlantGetResolve
  ]
})
export class EriskMasterDataModule { }
