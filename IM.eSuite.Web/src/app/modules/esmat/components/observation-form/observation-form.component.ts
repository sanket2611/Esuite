import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from "@angular/core";
import { HttpResponse } from "@angular/common/http";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { SelectItem, SortViewModel } from "@im-angular/core";
import { AuthorizationService } from "@im-angular/authentication";
import { ModalDirective } from "ngx-bootstrap/modal";
import { ToastrService } from "ngx-toastr";
import { TranslateService } from "@ngx-translate/core";
import { ListRequestService } from "../../../../services/list-request.service";
import { ObservationService } from "../../services/observation.service";
import { ObservationSubCategoryService } from "../../services/observation-sub-category.service";
import { EsmatActionPlanService } from "../../services/esmat-action-plan.service";
import { ObservationTypeEnum } from "../../enums/observation-type.enum";
import { ObservationSubCategoryListRequest } from "../../models/observation-sub-category-list-request.model";
import { ObservationSubCategoryList } from "../../models/observation-sub-category-list.model";
import { ActionViewModel } from "../../viewModels/action.viewModel";
import { StatusEnum } from '../../../eaction/enums/status.enum';
import "rxjs/add/operator/map";
import { ScheduleGet } from "../../models/schedule-get.model";

@Component({
  selector: "app-observation-form",
  templateUrl: "./observation-form.component.html",
  styleUrls: ["./observation-form.component.less"]
})
export class ObservationFormComponent implements OnInit {  
  @Input() categories: Array<SelectItem>;
  @Input() observationForm: FormGroup;
  @Input() schedule: ScheduleGet;
  @Input() imageFile: File; 
  @Input('is-removable') isRemovable: boolean;
  @Output() addObservation: EventEmitter<number> = new EventEmitter<number>();
  @Output() removeObservation: EventEmitter<void> = new EventEmitter<void>();
  @Output() imageFileChange: EventEmitter<File> = new EventEmitter<File>();
  @ViewChild('actionModal') actionModal: ModalDirective;
  StatusEnum = StatusEnum;
  
  private _smatees: Array<SelectItem>;

  get smatees(): Array<SelectItem> {
    return this._smatees;
  }
  
  @Input()
  set smatees(smatees: Array<SelectItem>) {
    this._smatees = smatees;
    if(!smatees || smatees.length==0){
      this.observationForm.controls.smateeId.setValue(undefined);
    }
    else if(smatees.length == 1){
      this.observationForm.controls.smateeId.setValue(this._smatees[0].id);
    }
  }

  get model() { return (<FormGroup>this.observationForm).value; }  
  
  subcategories: Array<SelectItem>;
  ObservationTypeEnum = ObservationTypeEnum;

  constructor(private observationSubcategoryService: ObservationSubCategoryService, private listRequestService: ListRequestService,
    private toastrService: ToastrService, private translateService: TranslateService, private observationService: ObservationService,
    private eSmatActionPlanService: EsmatActionPlanService, private formBuilder: FormBuilder, public authorizationService: AuthorizationService) { }

  ngOnInit() {
    if(this.model.categoryId){
      this.getSubcategories();
    }
  }

  onCategorySelected() {
    this.observationForm.controls.subCategoryId.setValue(undefined);    
    this.getSubcategories();    
  }

  onCategoryRemoved() {
    this.observationForm.controls.subCategoryId.setValue(undefined);
  }

  onImageChanged(event: Event) {    
    this.imageFile = undefined;
    const fileSizeLimit = 3000000;
    let input = (<HTMLInputElement>event.target);
    
    if(input.files && input.files[0]){
      if(input.files[0].size > fileSizeLimit){
        this.translateService.get("eSMAT.Smat.ExceededImageSize")
          .subscribe(message => this.toastrService.error(message));
        input.value = "";
        return;
      }
      this.imageFile = input.files[0];
    }

    this.imageFileChange.emit(this.imageFile);
  }

  onViewPhotoClicked(){
    //Based on browser behaviors, we had to adapt the display of the image
    let newWindow: Window;
    if(!window.navigator.msSaveOrOpenBlob){
      newWindow = window.open();
    }

    this.observationService.getImage(this.model.id)
      .subscribe((response: HttpResponse<Blob>) => {
        
        let blob = new Blob([response.body], { type: response.headers.get("Content-Type") });
        if(newWindow){
          var reader = new FileReader();

          reader.onloadend = function() {
            let isChromeiOS = window.navigator.userAgent.indexOf('CriOS') !== -1;
            newWindow.location.href = isChromeiOS? reader.result: URL.createObjectURL(blob);
          };
          reader.readAsDataURL(blob);
        }
        else {
          window.navigator.msSaveOrOpenBlob(blob);
        }
      });
  }

  onAddObservationClicked() {
    this.addObservation.emit(this.model.type);
  }

  onRemoveButtonClicked() {
    this.removeObservation.emit();
  }

  onAddActionClicked(){    
    if(!this.observationForm.contains('actionPlan')){
      let actionGroup = this.formBuilder.group({
        responsible: [null, Validators.required],
        responsibleFirstName: [null, Validators.required],
        responsibleLastName: [null, Validators.required],
        status: [StatusEnum[StatusEnum.Opened], Validators.required],
        description: [null, Validators.required],
        actionTaken: [null, Validators.required],
        initialDueDate: [null, Validators.required],      
        dueDate: [null, Validators.nullValidator],
        completionDate: [],
        closingDate: [],
        comment: [],
        feedbackEmails: []
      });

      this.observationForm.addControl('actionPlan', actionGroup);
    }

    if(this.model.actionPlanId){
      this.eSmatActionPlanService.get(this.model.actionPlanId)
        .subscribe(actionPlan => {
          let model = ActionViewModel.getFromActionPlanGet(actionPlan);
          this.observationForm.controls['actionPlan'].setValue(model);
        });
    }
    this.actionModal.show();    
  }

  private getSubcategories(){
    let request = this.getListRequest();
    this.observationSubcategoryService.list(request)
      .map(subcategories => subcategories.entries.map(subcategory => ObservationSubCategoryList.toSelectItem(subcategory)))
      .subscribe(subCategories => this.subcategories = subCategories);
  }

  private getListRequest(): ObservationSubCategoryListRequest {
    let sorting = new SortViewModel();
    sorting.sortBy = 'description';
    let request = this.listRequestService.getListRequest(ObservationSubCategoryListRequest, 1, 50, sorting);
    request.plantId = this.schedule.plantId;
    request.observationCategoryId = this.model.categoryId;
    request.onlyActiveForPlant = true;
    return request;
  }
}