import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { AuthorizationService } from '@im-angular/authentication';
import { Observable } from 'rxjs/Observable';
import { ScheduleViewModel } from '../../viewModels/schedule.viewModel';
import { ScheduleFormService } from './schedule-form.service';

@Component({
  selector: 'app-schedule-form',
  templateUrl: './schedule-form.component.html',
  styleUrls: ['./schedule-form.component.less'],
  providers: [ ScheduleFormService ]
})
export class ScheduleFormComponent implements OnInit {  
  isSaveInProgress: boolean;
  scheduleForm: FormGroup = new FormGroup({});
  private isEdition = false;

  constructor(private route: ActivatedRoute, public authorizationService: AuthorizationService,
    private scheduleFormService: ScheduleFormService) {
  }

  ngOnInit() {
    if (this.route.snapshot.data['schedule']) {
      this.isEdition = true;
    }
  }

  onSubmit() {
    this.isSaveInProgress = true;
    let schedule = Object.assign(new ScheduleViewModel(), <ScheduleViewModel>this.scheduleForm.value.schedule)
      .toScheduleSave();
    let saveObservable = this.isEdition ? this.scheduleFormService.updateSchedule(schedule)
      : this.scheduleFormService.createSchedule(schedule);

    saveObservable.finally(() => this.isSaveInProgress = false)
      .subscribe();
  }
}