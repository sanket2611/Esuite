import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SelectItem } from '@im-angular/core';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/distinctUntilChanged";
import "rxjs/add/operator/switchMap";
import { CountryService } from '../../../organization/services/country.service';
import { BusinessUnitService } from '../../../organization/services/business-unit.service';
import { SOAService } from '../../../organization/services/soa.service';
import { PlantService } from '../../../organization/services/plant.service';
import { Plant } from '../../../organization/models/plant';
import { Delegation } from '../../../organization/models/delegation';
import { Country } from '../../../organization/models/country';
import { Sector } from '../../../organization/models/sector';
import { BusinessUnit } from '../../../organization/models/businessUnit';
import { SOA } from '../../../organization/models/soa';
import { PlantSearchRequest } from '../../../organization/models/plantSearchRequest';

@Component({
  selector: 'app-user-form-plant-filter',
  templateUrl: './user-form-plant-filter.component.html',
  styleUrls: ['./user-form-plant-filter.component.less']
})
export class UserFormPlantFilterComponent implements OnInit, OnDestroy {  
  @Output()onPlantFilteredRequest: EventEmitter<Plant[]> = new EventEmitter<Plant[]>();
  @Output()onPlantFilterRemovedRequest: EventEmitter<void> = new EventEmitter<void>();
  delegations: Array<SelectItem>;  
  countries: Array<SelectItem>;  
  sectors: Array<SelectItem>;
  businessUnits: Array<SelectItem>;
  soas: Array<SelectItem>;
  request: PlantSearchRequest;
  private readonly debounceTime = 500;
  private searchPlantChanged: Subject<PlantSearchRequest> = new Subject<PlantSearchRequest>();
  private subscription: Subscription; 
  
  constructor(private route: ActivatedRoute, private countryService: CountryService, private businessUnitService: BusinessUnitService,
    private soaService: SOAService, private plantService: PlantService) { }

  ngOnInit() {
    let delegations: Array<Delegation> = this.route.snapshot.data['delegations'];
    this.delegations = delegations.map(d => Delegation.toSelectItem(d));

    let sectors: Array<Sector> = this.route.snapshot.data['sectors'];
    this.sectors = sectors.map(s => Sector.toSelectItem(s));
    this.request  = new PlantSearchRequest();

    this.subscription = this.searchPlantChanged.asObservable()
      .debounceTime(this.debounceTime)
      .distinctUntilChanged()
      .switchMap(search => this.plantService.search(search))
      .subscribe(result => this.onPlantFilteredRequest.emit(result));    
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  onDelegationSelected(){
    this.countryService.search(undefined, this.request.delegationId).subscribe(countries => this.countries = countries.map(c => Country.toSelectItem(c)));
    this.searchPlant();
  }

  onDelegationRemoved(){
    this.request.countryId = undefined;
    if(this.request.sectorId){
      this.searchPlant();
    }
    else{
      this.onPlantFilterRemovedRequest.emit();
    }
  }

  onCountrySelected(){
    this.searchPlant();
  }

  onCountryRemoved(){
    this.searchPlant();
  }

  onSectorSelected(){
    this.businessUnitService.search(undefined, this.request.sectorId).subscribe(businessUnits => this.businessUnits = businessUnits.map(bu => BusinessUnit.toSelectItem(bu)))
    this.searchPlant();
  }

  onSectorRemoved(){
    this.request.businessUnitId = undefined;
    if(this.request.delegationId){
      this.searchPlant();
    }
    else{
      this.onPlantFilterRemovedRequest.emit();
    }
  }

  onBusinessUnitSelected(){
    this.soaService.search(undefined, this.request.businessUnitId).subscribe(soas => this.soas = soas.map(soa => SOA.toSelectItem(soa)));
    this.searchPlant();
  }

  onBusinessUnitRemoved(){
    this.request.soaId = undefined;
    this.searchPlant();
  }

  onSOASelected(){
    this.searchPlant();
  }

  onSOARemoved(){
    this.searchPlant();
  }

  private searchPlant(){
    let request = new PlantSearchRequest(this.request); 
    this.searchPlantChanged.next(request);
  }
}
