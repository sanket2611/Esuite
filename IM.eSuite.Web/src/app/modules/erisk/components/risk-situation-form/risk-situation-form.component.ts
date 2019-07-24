import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SelectItem, SortViewModel, ListRequest } from '@im-angular/core';
import { HazardList } from '../../models/hazard-list.model';
import { SituationViewModel } from '../../viewModels/situation.viewModel';
import { HazardService } from '../../services/hazard.service';
import { HazardListRequest } from '../../models/hazard-list-request';
import { ListRequestService } from '../../../../services/list-request.service';

@Component({
  selector: 'app-risk-situation-form',
  templateUrl: './risk-situation-form.component.html',
  styleUrls: ['./risk-situation-form.component.less']
})
export class RiskSituationFormComponent implements OnInit {
  private _plantId: number;
  @Input() parentForm: FormGroup;
  @Input() situations: SituationViewModel;
  hazards: Array<SelectItem>;
  situationForm: FormGroup;
  
  @Input() get plantId(){
    return this._plantId;
  }

    set plantId(value: number){    
    this.hazards = [];
    this._plantId = value;
    if(value) {
      this.loadHazards(value);  
    }
  }

  constructor(private formBuilder: FormBuilder, private router: ActivatedRoute,private hazardService : HazardService, private listRequestService : ListRequestService) { }

  ngOnInit() {
    
    this.situationForm = this.formBuilder.group({
      hazardId: [null, Validators.required],
      description: [null] } );
    
    this.parentForm.addControl('situations', this.situationForm);

    if (this.situations) {
      let model = this.situations;
      this.situationForm.patchValue(model);
    }
  }

  loadHazards(plantId: number) {
    this.hazards  = new Array<SelectItem>();
    if (plantId) {
      let request = this.getHazadsListRequest(plantId);
      this.hazardService.list(request).subscribe(
        response => {
          let hazardList = response;
          this.hazards = hazardList.entries.map(p => HazardList.toSelectItem(p));
        }
      );
    }
  }


  private getHazadsListRequest(plantId : number): HazardListRequest {
    let sortVm = new SortViewModel();
    sortVm.sortBy = 'description';
    let request = this.listRequestService.getListRequest(ListRequest, 1, 50, sortVm);
    let hazardListRequest: HazardListRequest = new HazardListRequest(request, plantId,true);
    return hazardListRequest;
  }

}