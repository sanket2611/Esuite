import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PagedList, SelectItem } from '@im-angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/distinctUntilChanged";
import "rxjs/add/operator/switchMap";

import { UserService } from '../../services/user.service';
import { ApplicationUser } from '../../models/applicationUser';

@Component({
  selector: 'app-user-list-filter',
  templateUrl: './user-list-filter.component.html',
  styleUrls: ['./user-list-filter.component.less']
})
export class UserListFilterComponent implements OnInit {
  users: Array<SelectItem>;
  userId: number;  
  @Output()onFilterRemovedRequest: EventEmitter<void> = new EventEmitter<void>();
  @Output()onUserFilteredRequest: EventEmitter<PagedList<ApplicationUser>> = new EventEmitter<PagedList<ApplicationUser>>();
  private searchUserChanged: Subject<string> = new Subject<string>(); 
  private readonly debounceTime = 400;

  constructor(private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit() {
    let users: PagedList<ApplicationUser> = this.route.snapshot.data['users'];    
    this.users = users.entries.map(u => ApplicationUser.toSelectItem(u));

    this.searchUserChanged.asObservable()
      .debounceTime(this.debounceTime)
      .distinctUntilChanged()
      .switchMap(search => this.searchUser(search))
      .subscribe(response => this.users = response.map(u => ApplicationUser.toSelectItem(u)));
  }

  onUserSearchChanged(search: string){    
    this.searchUserChanged.next(search);
  }

  onUserRemoved(){
    this.onFilterRemovedRequest.emit();
  }

  onUserSearchClicked(){    
    this.userService.get(this.userId).subscribe(response => {
      let result = new PagedList<ApplicationUser>();
      result.entries = [response];
      result.totalCount = 1;
      result.totalPages = 1;
      this.onUserFilteredRequest.emit(result);
    });
  }

  private searchUser(search: string): Observable<ApplicationUser[]>{
    if(!search){
      return Observable.of([]);
    }

    return this.userService.search(search);
  }
}