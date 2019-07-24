import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { ScheduleService } from '../../services/schedule.service';
import { ScheduleSave } from '../../models/schedule-save.model';

@Injectable()
export class ScheduleFormService {

  constructor(private scheduleService: ScheduleService, private translateService: TranslateService,
    private toastrService: ToastrService, private router: Router) { }
  
  createSchedule(schedule: ScheduleSave): Observable<number>{
    return this.scheduleService.create(schedule).do(
      result => {
        this.saveSuccess("eSMAT.Schedule.SuccessfullyCreated");           
      });
  }

  updateSchedule(schedule: ScheduleSave): Observable<any>{
    
    return this.scheduleService.update(schedule).do(result => {
        this.saveSuccess("eSMAT.Schedule.SuccessfullyUpdated");
      },
      error => {
        if(error){          
          switch(error.status){
            case 404:
              this.translateService.get("eSMAT.Schedule.NotFound", { id: schedule.id })
                .subscribe(message => this.toastrService.error(message));              
              break;
            default:
              break;
          }
        }
      });
  }

  private saveSuccess(messageTranslationKey: string)
  {
    this.translateService.get(messageTranslationKey)
      .subscribe(message => { 
        this.toastrService.success(message).onHidden.subscribe(() => 
          this.router.navigate(['/e-smat']));            
      });
  }
}