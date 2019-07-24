import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { FormGroup, FormBuilder } from '@angular/forms';
import { RiskService } from '../../services/risk-service';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { LocationNamesViewModel } from '../../viewModels/loocation-names.viewModel';


@Component({
  selector: 'app-risks-copy',
  templateUrl: './risks-copy.component.html',
  styleUrls: ['./risks-copy.component.less']
})
export class RisksCopyComponent implements OnInit {

  @Input() riskIds: number[];
  @Input() modal: BsModalRef;
  @Output() risksCopyRequest = new EventEmitter<number>();
  workstationName: string;
  plantName: string;
  locationForm: FormGroup;
  isSaveInProgress: boolean;

  constructor(private formBuilder: FormBuilder
    , private riskService: RiskService
    , private translateService: TranslateService
    , private toastrService: ToastrService) { }

  ngOnInit() {

    this.locationForm = this.formBuilder.group({

    });

  }

  onCopyClicked() {

    this.isSaveInProgress = true;
    this.riskService.copy(this.locationForm.value.location, this.riskIds)
      .subscribe(
        response => {
          this.translateService.get('eRisk.SuccessfullyCopied', { workstationName: this.workstationName, plantName: this.plantName }).mergeMap(message => this.toastrService.success(message).onHidden)
            .subscribe(() => {
              this.risksCopyRequest.emit();
            });
        },
        // error 
        () => {
          this.translateService.get('eRisk.ErrorCopy')
            .subscribe(message => this.toastrService.error(message));
        }
        ,
        // Finally
        () => {
          this.isSaveInProgress = false;
          this.closeModal();
        }
      );
  }

  onWorkStationChanged(locationNames: LocationNamesViewModel) {
    this.plantName = locationNames.PlantName;
    this.workstationName = locationNames.WorkStationName;
  }

  onCloseClick() {
    this.closeModal();
  }

  private closeModal(): void {
    this.locationForm.reset();
    this.modal.hide();
  }
}
