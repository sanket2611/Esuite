import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/finally';

import { ToastrService } from 'ngx-toastr';
import { AuthorizationService } from '@im-angular/authentication';
import { UserFormService } from './user-form.service';

import { PagedList } from '@im-angular/core';
import { ApplicationUser } from '../../models/applicationUser';
import { UserGroup } from '../../models/userGroup';
import { ApplicationViewModel } from '../../viewModels/application.viewModel';
import { Plant } from '../../../organization/models/plant';
import { UserPlant } from '../../models/userPlant';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.less']
})
export class UserFormComponent implements OnInit {
  user: ApplicationUser;
  applications: ApplicationViewModel;
  plants: Array<Plant>;  
  isDirectorySearchInProgress = false;
  isSaveInProgress = false;
  isEdition = false;

  constructor(private route: ActivatedRoute, private userFormService: UserFormService,
    private toastrService: ToastrService, public authorizationService: AuthorizationService) { }

  ngOnInit() {    
    this.applications = this.route.snapshot.data['userGroups'];

    this.user = new ApplicationUser();
    let routeUser = this.route.snapshot.data['user'];        
    if (routeUser)
    {
      this.user = routeUser;
      this.plants = this.user.plants.map(up => up.plant).sort((p1, p2) => Plant.comparePlantByName(p1, p2));
      this.isEdition = true;
    }
  }

  onDirectorySearchClicked() {
    this.isDirectorySearchInProgress = true;
    this.userFormService.onDirectorySearchClicked(this.user.userName)
      .finally(() => this.isDirectorySearchInProgress = false)
      .subscribe(u => this.user = u);
  }

  onSubmit() {
    this.isSaveInProgress = true;

    if (this.user.email === '') {
      this.user.email = null;
    }

    let saveObservable = this.isEdition? this.userFormService.updateUser(this.user)
      : this.userFormService.createUser(this.user);

    saveObservable.finally(() => this.isSaveInProgress = false)
      .subscribe();
  }

  getApplicationUserGroupId(applicationId: number): number {
    let userGroup = this.user.userGroups.find(ug => ug.applicationUserGroup && ug.applicationUserGroup.applicationId == applicationId);
    if(!userGroup){
        userGroup = new UserGroup();
        userGroup.userId = this.user.id;
        userGroup.applicationUserGroup.applicationId = applicationId;
        this.user.userGroups.push(userGroup);
    }

    return userGroup.applicationUserGroupId;
  }

  onUserGroupChanged(applicationId: number, event: Event){
    let userGroup = this.user.userGroups.find(ug => ug.applicationUserGroup.applicationId == applicationId);
    if(userGroup){      
      userGroup.applicationUserGroupId = +(<HTMLSelectElement>event.target).value
    }
  }

  onPlantFiltered(plants: Array<Plant>){
    this.plants = plants.sort((p1, p2) => Plant.comparePlantByName(p1, p2));
  }

  onPlantFilterRemoved(){
    this.plants = this.user.plants.map(up => up.plant).sort((p1, p2) => Plant.comparePlantByName(p1, p2));
  }

  hasPlant(plantId: number): boolean {
    return this.user.plants.some(up => up.plantId == plantId);;
  }

  onUserPlantChanged(plantId: number, event: Event){
    let userPlant = this.user.plants.some(up => up.plantId == plantId);
    let isChecked = +(<HTMLInputElement>event.target).checked;

    if(userPlant && !isChecked){      
      let index = this.user.plants.findIndex(up => up.plantId == plantId);
      this.user.plants.splice(index, 1);
    }
    else if(!userPlant && isChecked){
      this.addUserPlant(plantId);
    }
  }

  hasAllPlant(): boolean {
    if(!this.plants || this.plants.length == 0 || !this.user || this.user.plants.length == 0){
      return false;
    }
    let allPlantIds = this.plants.map(p => p.id);
    let userPlantIds = this.user.plants.map(up => up.plantId);
    let difference = allPlantIds.filter(plantId => userPlantIds.indexOf(plantId) < 0);    
    return difference.length == 0;
  }

  onAllPlantChanged(event: Event){
    if(this.plants.length == 0){    
      return;
    }
    
    let isChecked = +(<HTMLInputElement>event.target).checked;
    if(!isChecked){
      this.user.plants.splice(0, this.user.plants.length);
    }
    else{
      this.plants.forEach(p => this.addUserPlant(p.id));
    }
  }

  private addUserPlant(plantId: number){
    let userPlant = new UserPlant();
    userPlant.userId = this.user.id;
    userPlant.plantId = plantId;
    this.user.plants.push(userPlant);
  }
}