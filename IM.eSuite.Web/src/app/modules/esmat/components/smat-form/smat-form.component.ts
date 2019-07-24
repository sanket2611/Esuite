import { Component, OnInit} from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { AuthorizationService } from "@im-angular/authentication";
import { DirectoryService } from "../../../administration/services/directory.service";
import { ObservationCategoryService } from "../../services/observation-category.service";
import { SmatFormService } from "./smat-form.service";
import { TranslateService } from "@ngx-translate/core";
import { SelectItem } from "@im-angular/core";
import { ObservationTypeEnum } from "../../enums/observation-type.enum";
import { StatusEnum } from '../../../eaction/enums/status.enum';
import { ObservationCategoryList } from "../../models/observation-category-list.model";
import { SmatGet } from "../../models/smat-get.model";
import { ScheduleGet } from "../../models/schedule-get.model";
import { SmatViewModel } from "../../viewModels/smat.viewModel";
import { ObservationViewModel } from "../../viewModels/observation.viewModel";
import { Shift } from "../../models/shift.model";
import { Subject } from "rxjs/Subject";
import "rxjs/add/operator/map";

@Component({
  selector: "app-smat-form",
  templateUrl: "./smat-form.component.html",
  styleUrls: ["./smat-form.component.less"],
  providers: [
    SmatFormService    
  ]
})
export class SmatFormComponent implements OnInit {
  smatForm: FormGroup;  
  scheduleGet: ScheduleGet;
  plantId: number;
  isSaveInProgress: boolean;  

  shifts: Array<SelectItem>;
  ehsKeyPoints: Array<SelectItem>;
  feedbackEmails: Array<SelectItem>;
  categories: Map<ObservationTypeEnum, Array<SelectItem>>;
  smatees: Array<SelectItem>;
  imagesFiles: Array<File>;
  StatusEnum = StatusEnum;

  private id: number;
  private searchEmailChanged: Subject<string> = new Subject<string>();

  get schedule() { return <FormGroup>this.smatForm.controls.schedule; }
  get observations() { return <FormArray>this.smatForm.controls.observations; }
  get observationsModel() { return (<ObservationViewModel[]>this.observations.value); }
  
  get isEditMode(): boolean {
    return this.route.snapshot.paramMap.has('id');
  }

  ObservationTypeEnum = ObservationTypeEnum;

  constructor(private route: ActivatedRoute, public authorizationService: AuthorizationService,
    private formBuilder: FormBuilder, private observationCategoryService: ObservationCategoryService,
    private smatFormService: SmatFormService, private directoryService: DirectoryService, private translateService: TranslateService) {
  }

  ngOnInit() {
    let shifts: Shift[] = this.route.snapshot.data['shifts'];
    this.shifts = shifts.map(s => Shift.toSelectItem(s));

    this.translateService.get('Common.Buttons.Yes')
    .subscribe(yes => {
      this.translateService.get('Common.Buttons.No')
        .subscribe(no => {
          this.ehsKeyPoints = [
            { id: true, text: yes },
            { id: false, text: no }
          ];
        });
    });

    this.categories = new Map<ObservationTypeEnum, Array<SelectItem>>();
    this.imagesFiles = new Array<File>();
    this.initFormGroup();

    this.id = +this.route.snapshot.paramMap.get('id');
    let smat: SmatGet = this.route.snapshot.data['smat'];
    
    if(!smat) {
      this.addObservation(ObservationTypeEnum.PositivePoint, 0);
      this.addObservation(ObservationTypeEnum.UnsafeAct, 1);
      this.addObservation(ObservationTypeEnum.UnsafeCondition, 2);
    }
    else {      
      let model = SmatViewModel.fromSmatGet(smat);
      this.scheduleGet = smat.schedule;
      
      for (let i = 0; i < smat.observations.length; i++) {
        let observation = ObservationViewModel.fromObservationGet(smat.observations[i]);
        this.addObservationForm(observation, i);        
      }

      if(model.feedbackEmails){
        this.feedbackEmails = model.feedbackEmails.map(e => this.emailToSelectItem(e));        
      }

      this.smatForm.patchValue({date: model.date});
      this.smatForm.patchValue({shiftId: model.shiftId});      
      this.smatForm.patchValue({ehsKeyPoint: model.ehsKeyPoint});
      this.smatForm.patchValue({comment: model.comment});
      if(model.feedbackEmails){
        this.smatForm.patchValue({feedbackEmails: model.feedbackEmails});
      }          
    }    

    this.searchEmailChanged.asObservable()
      .debounceTime(400)
      .distinctUntilChanged()
      .switchMap(search => this.directoryService.getEmailByName(search))
      .map(emails => emails.map(e => this.emailToSelectItem(e)))
      .subscribe(emails => {
        let model = <SelectItem[]>this.smatForm.value.feedbackEmails;
        this.feedbackEmails = model.concat(emails);      
      }); 
  }

  onPlantChanged(plantId: number){
    this.categories.clear();
    this.plantId = plantId;

    if(plantId){
      this.observationCategoryService.getByPlantId(plantId)
        .map(categories => {
          let result = new Map<ObservationTypeEnum, Array<SelectItem>>();
          categories.filter(category => category.subCategoryCount > 0).forEach(category => {
            let c = result.get(category.categoryTypeId);
            if (c) {
              c.push(ObservationCategoryList.toSelectItem(category));
            }
            else{
              result.set(category.categoryTypeId, [ObservationCategoryList.toSelectItem(category)]);
            }
        });
        return result;
      })
      .subscribe(categories => this.categories = categories);
    }
  }

  onScheduleSmateeChanged(smatees: Array<SelectItem>){
    this.smatees = smatees;
  }  

  addObservation(observationTypeId: number, index: number) {    
    let observation = new ObservationViewModel(observationTypeId);    
    this.addObservationForm(observation, index);    
  }

  removeObservation(index: number) {
    this.observations.removeAt(index);    
  }

  isRemovable(type: ObservationTypeEnum){
    return this.observationsModel.filter(o => o.type === type).length > 1;
  }

  onEmailTyped(name: string){
    if(name){
      this.searchEmailChanged.next(name);
    }    
  }

  onSubmit() {
    this.isSaveInProgress = true;
    this.smatFormService.saveSmat(this.id, this.smatForm.value, this.imagesFiles)
      .finally(() => this.isSaveInProgress = false)
      .subscribe();
  }

  private initFormGroup(){
    this.smatForm = this.formBuilder.group({
      date : [new Date(), Validators.required],
      shiftId: [],
      ehsKeyPoint: [],
      feedbackEmails: [[]],
      comment: [],
      observations: this.formBuilder.array([]),
    });
  }

  private addObservationForm(observation: ObservationViewModel, index: number){
    this.imagesFiles.splice(index, 0, undefined);
    
    let observationForm = this.formBuilder.group({
      id: [observation.id],
      type: [observation.type],
      smateeId: [observation.smateeId, Validators.required],
      categoryId: [observation.categoryId, Validators.required],
      subCategoryId: [observation.subCategoryId, Validators.required],
      comment: [observation.comment],
      isImmediateAction: [observation.isImmediateAction],
      isTf4Tf5: [observation.isTf4Tf5],
      hasImage: [observation.hasImage],
      actionPlanId:[observation.actionPlanId]
    });
    
    this.observations.insert(index, observationForm);
  }

  private emailToSelectItem(email: string): SelectItem{
    let result = new SelectItem();
    result.text = email;
    return result;
  }
}