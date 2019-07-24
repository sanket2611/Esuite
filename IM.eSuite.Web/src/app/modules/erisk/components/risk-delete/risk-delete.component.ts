import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { RiskService } from '../../services/risk-service';
import { RiskList } from '../../models/risk-list.model';
import 'rxjs/add/operator/mergeMap';

@Component({
  selector: 'app-risk-delete',
  templateUrl: './risk-delete.component.html',
  styleUrls: ['./risk-delete.component.less']
})
export class RiskDeleteComponent implements OnInit {
  @Input()riskIds: number[];
  @Input()modal: BsModalRef;
  @Output()deletedRisksRequest = new EventEmitter<number[]>();

  constructor(private riskService: RiskService, private toastrService: ToastrService,
    private translateService: TranslateService) { }

  ngOnInit() {
  }

  onDeleteClicked() {
    this.riskService.delete(this.riskIds)
      .subscribe(() => {
        this.translateService.get('eRisk.SuccessfullyDeleted')
          .mergeMap(message => this.toastrService.success(message).onHidden)
          .subscribe(() => {
            this.deletedRisksRequest.emit(this.riskIds);
            this.modal.hide();
          });
      }, () => {
        this.translateService.get('eRisk.ErrorDeleted')
          .subscribe(message => this.toastrService.error(message));
      });
  }
}
