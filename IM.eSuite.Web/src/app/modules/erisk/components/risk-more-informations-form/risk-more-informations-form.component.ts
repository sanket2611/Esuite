import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { MoreInformationViewModel } from "../../viewModels/more-information.viewModel";
import { ToastrService } from "ngx-toastr";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'app-risk-more-informations-form',
  templateUrl: './risk-more-informations-form.component.html',
  styleUrls: ['./risk-more-informations-form.component.less']
})
export class RiskMoreInformationsFormComponent implements OnInit {
  @Input() parentForm: FormGroup;
  @Input() moreInformation : MoreInformationViewModel;
  @Input() file : File;
  @Output() fileChange: EventEmitter<File> = new EventEmitter<File>();
  @Output() fileDownload = new EventEmitter();
  informationForm: FormGroup;

  constructor(private formBuilder: FormBuilder,private toastrService: ToastrService, private translateService: TranslateService) { }

  ngOnInit() {
    this.informationForm = this.formBuilder.group({
      comment:[]
    });
    this.parentForm.addControl("moreInformations", this.informationForm);

    if(this.moreInformation)
    {
      let model = this.moreInformation;
      this.informationForm.patchValue(model);
    }
  }
  
  onFileChange(event) {
    this.file = undefined;
    const fileSizeLimit = 3000000;
    let input = (<HTMLInputElement>event.target);
    
    if(input.files && input.files[0]){
      if(input.files[0].size > fileSizeLimit){
        this.translateService.get("eRisk.RiskForm.ExceededFileSize")
          .subscribe(message => this.toastrService.error(message));
        input.value = "";
        return;
      }
      this.file = input.files[0];
    }

    this.fileChange.emit(this.file);
  }

  onDownloadFileClicked(){
    this.fileDownload.emit();
  }
}