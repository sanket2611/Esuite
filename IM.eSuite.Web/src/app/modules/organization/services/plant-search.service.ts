import { Injectable,Component, OnInit } from '@angular/core';
import { SelectItem } from '@im-angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/distinctUntilChanged";
import "rxjs/add/operator/switchMap";
import 'rxjs/add/operator/map';

import { PlantService } from './plant.service';
import { Plant } from '../models/plant';
import { PlantSearchRequest } from '../models/plantSearchRequest';
import { PlantListRequest } from '../models/plantListRequest';

@Injectable()
export class PlantSearchService {
  private readonly debounceTime = 400;
  private searchPlantChanged: Subject<PlantListRequest> = new Subject<PlantListRequest>();  

  constructor(private plantService: PlantService) { }

  debounceSearchPlant(): Observable<SelectItem[]>{
    return this.searchPlantChanged.asObservable()
      .debounceTime(this.debounceTime)
      .distinctUntilChanged()
      .switchMap(search => this.plantService.list(search))
      .map(result => result.entries.map(p => Plant.toSelectItem(p)));      
  }

  onPlantSearchChanged(search: string){
    let request = new PlantListRequest();
    request.search = search;
    request.sortBy = 'name';
    request.pageSize = 10;
    this.searchPlantChanged.next(request);
  }  
}