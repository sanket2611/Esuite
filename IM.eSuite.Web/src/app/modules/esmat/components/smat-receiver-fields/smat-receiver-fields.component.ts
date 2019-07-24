import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { PagedList, SelectItem } from '@im-angular/core';
import { Subscription } from 'rxjs/Subscription';

import { SmatReceiverViewModel } from '../../viewModels/smat-receiver.viewModel';
import { Plant } from '../../../organization/models/plant';

import { AuthorizationService } from '@im-angular/authentication';
import { PlantSearchService } from '../../../organization/services/plant-search.service';
import { SmatReceiverFieldsService } from './smat-receiver-fields.service';
import { EmployeeType } from '../../models/employee-type.model';
import { BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-smat-receiver-fields',
  templateUrl: './smat-receiver-fields.component.html',
  styleUrls: ['./smat-receiver-fields.component.less'],
  providers: [ SmatReceiverFieldsService ] 
})
export class SmatReceiverFieldsComponent implements OnInit, OnDestroy {  
  plants: Array<SelectItem>;
  @Input() set plant(value: SelectItem){
    if(value){
      
      if(!this.plants){
        this.plants = [value];        
      }

      if(!this.receiver){
        this.receiver = new SmatReceiverViewModel();
      }
      this.receiver.plantId = value.id;
    }
    this._plant = value;
  }
  get plant() {
    return this._plant;
  }

  @Input() set reset(value: boolean){
    if(value){
      this.form.reset();
    }
    this._reset = value;
  }
  get reset() {
    return this._reset;
  }

  @Input() backLink: string;
  @Input() modal: BsModalRef;
  @Output() receiverCreatedRequest: EventEmitter<SmatReceiverViewModel> = new EventEmitter<SmatReceiverViewModel>();  
  @ViewChild("smatReceiverForm") form: HTMLFormElement;

  receiver : SmatReceiverViewModel ;
  employeeTypes: Array<SelectItem>;  
  isSaveInProgress: boolean;
  private isEdition = false;
  private subscription: Subscription;
  private _plant: SelectItem;
  private _reset: boolean;
  
  constructor(private route: ActivatedRoute, private router: Router, private plantSearchService: PlantSearchService, 
    private smatReceiverFieldsService: SmatReceiverFieldsService, public authorizationService: AuthorizationService ) { 
  }

  ngOnInit() {
    if(!this.receiver){
      this.receiver = new SmatReceiverViewModel();
    }
    
    let routeReceiver = this.route.snapshot.data['smatReceiver'];
    if(routeReceiver){
      this.isEdition = true;
      this.receiver = routeReceiver;
      this.plants = [Plant.toSelectItem(this.receiver.plant)];      
    }    
    else{
      let plants: PagedList<Plant> = this.route.snapshot.data['plants'];
      if(plants){
        this.plants = plants.entries.map(p => Plant.toSelectItem(p));
      }      
    }

    this.subscription = this.plantSearchService.debounceSearchPlant()
      .subscribe(result => this.plants = result);
    
    let employeeTypes: EmployeeType[] = this.route.snapshot.data['employeeTypes'];
    this.employeeTypes = employeeTypes.map(et => EmployeeType.toSelectItem(et));
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  onPlantSearchChanged(search: string){
    this.receiver.plantId = undefined;
    this.plantSearchService.onPlantSearchChanged(search);
  }

  onSubmit(){
    this.isSaveInProgress = true;    
    let model = SmatReceiverViewModel.toSmatReceiverSave(this.receiver);    
    let saveObservable = this.isEdition
      ? this.smatReceiverFieldsService.updateSmatReceiver(model)
      : this.smatReceiverFieldsService.createSmatReceiver(model)
        .do(receiver => {
          this.receiver.id = receiver.id;
          this.receiverCreatedRequest.emit(this.receiver);
        });

    saveObservable.finally(() => {
        this.isSaveInProgress = false;
        this.receiver = new SmatReceiverViewModel(); // reset model
      })
      .subscribe(() => this.onCancelClicked());
  }

  onCancelClicked(){
    if(this.backLink){
      this.router.navigate([this.backLink]);
    }

    if(this.modal){
      this.modal.hide();
    }
  }
}