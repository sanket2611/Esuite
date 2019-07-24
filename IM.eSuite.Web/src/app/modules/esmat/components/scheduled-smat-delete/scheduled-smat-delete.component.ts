import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { ScheduleService } from '../../services/schedule.service';

@Component({
  selector: 'app-scheduled-smat-delete',
  templateUrl: './scheduled-smat-delete.component.html',
  styleUrls: ['./scheduled-smat-delete.component.less']
})
export class ScheduledSmatDeleteComponent implements OnInit {
  @Input()scheduleId: number;
  @Input()modal: BsModalRef;
  @Output()deletedScheduleRequest = new EventEmitter<number>();

  constructor(private scheduleService: ScheduleService, private toastrService: ToastrService,
    private translateService: TranslateService) { }

  ngOnInit() {
  }

  onDeleteClicked(){
    this.scheduleService.delete(this.scheduleId)
      .subscribe(response => {
        this.translateService.get("eSMAT.Schedule.SuccessfullyDeleted", {id: this.scheduleId})
          .mergeMap(message => this.toastrService.success(message).onHidden)          
          .subscribe(() => {
            this.deletedScheduleRequest.emit(this.scheduleId);          
            this.modal.hide();
          });
      }, error => {
        this.translateService.get("eSMAT.Schedule.ErrorDeleted", {id: this.scheduleId})
          .subscribe(message => this.toastrService.error(message));
      });      
  }
}