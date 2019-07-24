import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { TranslationService } from '../../../../services/translation.service';
import { MeanOfControlService } from '../../services/mean-of-control.service';
import { SelectItem, PagedList } from '@im-angular/core';
import { EpiSelectItem } from '../../viewModels/epi-select-item.viewModel';
import { MeanOfControlSelectItem } from '../../viewModels/mean-of-control-select-item.viewModel';
import { MeanOfControlTypeEnum } from '../../enums/mean-of-control-type.enum';
import { MeanOfControlList } from '../../models/mean-of-control-list.model';
import { MeanOfControlGet } from '../../models/mean-of-control-get.model';
import { ReliabilityList } from '../../models/reliability-list.model';
import { RiskControlViewModel } from '../../viewModels/riskControl.viewModel';
import { EpiListRequest } from '../../models/epi-list-request.model';
import { EpiService } from '../../services/epi.service';
import { EpiList } from '../../models/epi-list.model';

@Component({
  selector: 'app-risk-control-form',
  templateUrl: './risk-control-form.component.html',
  styleUrls: ['./risk-control-form.component.less']
})
export class RiskControlFormComponent implements OnInit {
  @Input() parentForm: FormGroup;
  @Input() riskControl: RiskControlViewModel;

  private _plantId: number;

  @Input() get plantId() {
    return this._plantId;
  }
  set plantId(value: number) {
    this._plantId = value;
    this.meansOfControl = [];
    if (value) {
      this.setMeansOfControls(value);
      this.initEpis(value);
    }
  }

  riskControlForm: FormGroup;

  reliabilities: SelectItem[];
  meansOfControl: MeanOfControlSelectItem[];
  epis: EpiSelectItem[] = [];
  MeanOfControlTypeEnum = MeanOfControlTypeEnum;

  @ViewChild('addMeanOfControlModal') addMeanOfControlModal: ModalDirective;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private translateService: TranslateService,
    private translationService: TranslationService, private meanOfControlService: MeanOfControlService, private epiService: EpiService) { }

  ngOnInit() {
    this.riskControlForm = this.formBuilder.group({
      technicalMeasures: this.formBuilder.group({
        descriptions: [[]],
        comment: [],
        reliabilityId: [],
      }),
      organizations: this.formBuilder.group({
        descriptions: [[]],
        trainings: [[]],
        communicationAndInformations: [[]],
        ruleControls: [[]],
        others: [[]],
        comment: [],
        reliabilityId: []
      }),
      epis: this.formBuilder.group({
        descriptions: [[]],
        comment: [],
        reliabilityId: [],
        employeeType: []
      })
    });

    this.parentForm.addControl("riskControl", this.riskControlForm);
    var reliabilities = this.route.snapshot.data["reliabilities"];
    if (reliabilities) {
      this.reliabilities = reliabilities.map(r => ReliabilityList.toSelectItem(r));
    }



  }

  addMeanOfControl() {
    this.addMeanOfControlModal.show();
  }

  getMeansOfControlsByType(type: MeanOfControlTypeEnum): MeanOfControlSelectItem[] {
    if (!this.meansOfControl) {
      return new Array<MeanOfControlSelectItem>();
    }
    return this.meansOfControl.filter(moc => moc.type == type);
  }

  getMultiSelectSettings(textTranslationKey: string): any {
    var settings: any = {
      singleSelection: false,
      enableSearchFilter: true,
      badgeShowLimit: 5,
      labelKey: "text",
      classes: "dropdown-multi-select"
    };

    this.translateService.get("Common.Forms.SelectAll").subscribe(t => settings.selectAllText = t);
    this.translateService.get("Common.Forms.UnSelectAll").subscribe(t => settings.unSelectAllText = t);
    this.translateService.get(textTranslationKey).subscribe(t => settings.text = t);
    return settings;
  }

  getEpisMultiSelectSettings(): any {
    var settings: any = this.getMultiSelectSettings("eRisk.RiskForm.EpiForTask");
    settings.groupBy = "category";
    return settings;
  }

  onMeanOfControlCreated(meanOfControl: MeanOfControlGet) {
    var item = new MeanOfControlSelectItem();
    item.id = meanOfControl.id;
    item.type = meanOfControl.type;
    item.text = this.translationService.get(meanOfControl.descriptions);
    this.meansOfControl.unshift(item);
  }

  private setMeansOfControls(plantId: number) {
    this.meanOfControlService.list(plantId)
      .map(mocs => mocs.map(m => MeanOfControlList.toMeanOfControlSelectItem(m)))
      .subscribe(meansOfControl => {
        this.meansOfControl = meansOfControl;
        if (this.riskControl) {
          let model = this.riskControl;
          model.technicalMeasures.descriptions = this.meansOfControl.filter(moc => model.technicalMeasures.descriptions.some(d => d.id == moc.id));
          model.organizations.descriptions = this.meansOfControl.filter(moc => model.organizations.descriptions.some(d => d.id == moc.id));
          model.organizations.communicationAndInformations = this.meansOfControl.filter(moc => model.organizations.communicationAndInformations.some(cai => cai.id == moc.id));
          model.organizations.ruleControls = this.meansOfControl.filter(moc => model.organizations.ruleControls.some(rc => rc.id == moc.id));
          model.organizations.trainings = this.meansOfControl.filter(moc => model.organizations.trainings.some(t => t.id == moc.id));
          model.organizations.others = this.meansOfControl.filter(moc => model.organizations.others.some(o => o.id == moc.id));
          this.riskControlForm.patchValue(model);
        }
      });
  }

  private initEpis(plantId: number) {

    var request = new EpiListRequest();
    request.pageNumber = 1;
    request.pageSize = 50;
    request.sortBy = "description";
    request.onlyActiveForPlant = true;
    request.plantId = plantId;
    return this.epiService.list(request).subscribe
      (
      data => {
        let epis: PagedList<EpiList> = data;
        this.epis = epis.entries.map(EpiList.toEpiSelectItem);
        if (this.riskControl && this.riskControl.epis) {
          this.riskControl.epis.descriptions = this.epis.filter(epi => this.riskControl.epis.descriptions.some(d => d.id == epi.id));
          let episFromGroup : FormGroup = this.riskControlForm.controls.epis as FormGroup ; 
          episFromGroup.controls.descriptions.patchValue(this.riskControl.epis.descriptions);
        }
      }
      );
  }
}