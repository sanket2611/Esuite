import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AdminLteService {
  private readonly debounceTime = 200;
  private windowSizeChanged: Subject<void> = new Subject<void>();

  constructor() { }

  debounceWindowSizeChanged(): Observable<number>{
    return this.windowSizeChanged.asObservable()
      .debounceTime(this.debounceTime)      
      .switchMap(this.getContentHeight);      
  }

  onWindowSizeChanged(){
    this.windowSizeChanged.next();
  }

  private getContentHeight(): Observable<number> { 
    var headerHeight = document.querySelector('.main-header').scrollHeight || 0;
    var footerHeight = document.querySelector('.main-footer').scrollHeight || 0;  
    var windowHeight = window.innerHeight;        
    return Observable.of(windowHeight - (headerHeight + footerHeight));
  }
}