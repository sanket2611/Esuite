import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SelectItem } from '@im-angular/core';
import { AuthorizationService } from '@im-angular/authentication';
import { PlantFormService } from './plant-form.service';
import { CountryService } from '../../services/country.service';
import { BusinessUnitService } from '../../services/business-unit.service';
import { SOAService } from '../../services/soa.service';
import { Delegation } from '../../models/delegation';
import { Country } from '../../models/country';
import { Plant } from '../../models/plant';
import { Sector } from '../../models/sector';
import { BusinessUnit } from '../../models/businessUnit';
import { SOA } from '../../models/soa';

@Component({
  selector: 'app-plant-form',
  templateUrl: './plant-form.component.html',
  styleUrls: ['./plant-form.component.less']
})
export class PlantFormComponent implements OnInit {
  plant: Plant;
  delegations: Array<SelectItem>;
  countries: Array<SelectItem>;
  sectors: Array<SelectItem>;
  businessUnits: Array<SelectItem>;
  soas: Array<SelectItem>;
  isEdition: boolean;
  isSaveInProgress: boolean;
  constructor(private route: ActivatedRoute, private countryService: CountryService, 
    private businessUnitService: BusinessUnitService, private soaService: SOAService,
    private plantFormService: PlantFormService, public authorizationService: AuthorizationService) { }

  ngOnInit() {
    this.plant = new Plant();
    let routePlant = this.route.snapshot.data['plant'];    
    if (routePlant)
    {
      this.plant = routePlant;      
      this.isEdition = true;
      this.onDelegationSelected();
      this.onSectorSelected();
      this.onBusinessUnitSelected();
    }

    let delegations: Array<Delegation> = this.route.snapshot.data['delegations'];
    if(delegations){
      this.delegations = delegations.map(d => Delegation.toSelectItem(d));
    }

    let sectors: Array<Sector> = this.route.snapshot.data['sectors'];
    if(sectors){
      this.sectors = sectors.map(s => Sector.toSelectItem(s));
    }
  }

  onDelegationSelected(){    
    this.countryService.search(undefined, this.plant.country.delegationId).subscribe(countries => 
      this.countries = countries.map(c => Country.toSelectItem(c)));
  }

  onDelegationRemoved(){    
    this.plant.countryId = undefined;
  }

  onSectorSelected(){    
    this.businessUnitService.search(undefined, this.plant.soa.businessUnit.sectorId).subscribe(businessUnits => 
      this.businessUnits = businessUnits.map(bu => BusinessUnit.toSelectItem(bu)));
  }

  onSectorRemoved(){    
    this.plant.soa.businessUnitId = undefined;
    this.onBusinessUnitRemoved();
  }

  onBusinessUnitSelected(){    
    this.soaService.search(undefined, this.plant.soa.businessUnitId).subscribe(soas => 
      this.soas = soas.map(soa => SOA.toSelectItem(soa)));
  }

  onBusinessUnitRemoved(){    
    this.plant.soaId = undefined;
  }

  onSubmit() {
    this.isSaveInProgress = true;
    let saveObservable = this.isEdition? this.plantFormService.updatePlant(this.plant)
      : this.plantFormService.createPlant(this.plant);
    
    saveObservable.finally(() => this.isSaveInProgress = false)
      .subscribe();
  }
}
