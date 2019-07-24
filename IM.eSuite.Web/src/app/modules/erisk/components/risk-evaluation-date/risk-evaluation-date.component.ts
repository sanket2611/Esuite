import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { RiskService } from '../../services/risk-service';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-risk-evaluation-date',
  templateUrl: './risk-evaluation-date.component.html',
  styleUrls: ['./risk-evaluation-date.component.less']
})
export class RiskEvaluationDateComponent implements OnInit {
  @Input()riskIds: number[];
  @Input()modal: BsModalRef;
  @Output()updateRisksDateRequest = new EventEmitter<number[]>();

  constructor(private riskService: RiskService, private toastrService: ToastrService,
    private translateService: TranslateService) { }

  ngOnInit() {
  }

  onSaveClicked() {
    this.riskService.updateDate(this.riskIds)
      .subscribe(() => {
        this.translateService.get('eRisk.SuccessfullyDateEvaluationChange')
          .mergeMap(message => this.toastrService.success(message).onHidden)
          .subscribe(() => {
            this.updateRisksDateRequest.emit();
            this.modal.hide();
          });
      }, () => {
        this.translateService.get('eRisk.ErrorDateEvaluationChange')
          .subscribe(message => this.toastrService.error(message));
      });
  }
}
