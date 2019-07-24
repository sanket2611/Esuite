import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs/Observable';
import { mergeMap, concatMap, catchError } from 'rxjs/operators';
import { RiskService } from '../../services/risk-service';
import { RiskSave } from '../../models/risk-save.model';
import { RiskGet } from '../../models/risk-get.model';
import { RiskViewModel } from '../../viewModels/risk.viewModel';
import { EriskActionPlanService } from '../../services/erisk-action-plan.service';
import { ActionPlanGet } from '../../../eaction/models/action-plan-get.model';
import { ActionViewModel } from '../../viewModels/action.viewModel';
import { HttpResponse } from "@angular/common/http";
import { FileSaverService } from '../../../../services/file-saver.service';


@Injectable()
export class RiskEvaluationService {
  private model: RiskViewModel;
  private riskId : number;

  constructor(private riskService: RiskService, private translateService: TranslateService, private eRiskActionPlanService: EriskActionPlanService, private toastrService: ToastrService, private router: Router, private fileSaverService:FileSaverService) { }


  saveRisk(id: number, actionPlanid: number, model: RiskViewModel, file:File) {
    this.model = model;
    let risk = Object.assign(new RiskViewModel(), model).toRiskSave();
    risk.actionPlanId = actionPlanid;

    let saveObservable = id ? this.updateRisk(id, risk)
      : this.createRisk(risk);

    let modelActionPlan = this.model.actionPlan;

    if (modelActionPlan) {

      saveObservable = saveObservable.pipe(mergeMap((result) => {
        let actionPlan = Object.assign(new ActionViewModel(), modelActionPlan).toActionPlanSave();
        actionPlan.location = risk.location;
        actionPlan.sourceId = this.riskId;
        if (id) {
          return this.eRiskActionPlanService.update(actionPlanid,actionPlan)
          .mergeMap(() => this.saveSuccess("eRisk.RiskForm.ActionPlanSuccessfullyUpdated"));
        }
        else {
          return this.eRiskActionPlanService.create(actionPlan)
            .pipe(
              mergeMap((ap: ActionPlanGet) => {
                risk.actionPlanId = ap.id;
                return this.riskService.update(ap.sourceId, risk)
                .mergeMap(() => this.saveSuccess("eRisk.RiskForm.ActionPlanSuccessfullySaved"));
              })
            );
        }
      }));
    }

    if(file)
    {
      saveObservable = saveObservable.pipe(
        mergeMap(() => this.translateService.get("eRisk.RiskForm.UploadingFile")),
        mergeMap((message) => this.toastrService.info(message).onShown),
        mergeMap((result) => {
          let form = new FormData();
          let riskId = id ? id:this.riskId;
          form.append("file", file);
          return this.riskService.uploadFile(riskId, form)
          .catch(error => {              
            if(error.status == 400){
              this.toastrService.error(error.error);
            }
            return Observable.throw(error);
          }).pipe(
          mergeMap(() => this.translateService.get("eRisk.RiskForm.SuccessfullyUploadedFile")),
          mergeMap(message => this.toastrService.success(message).onHidden));
        }),
      );
    }

    saveObservable = saveObservable.do(() => this.redirect());
    return saveObservable;
  }

  downloadFile(id: number)
  {
    this.riskService.getFile(id)
    .subscribe((response: HttpResponse<Blob>) => {
      this.fileSaverService.saveToFileSystem(response);
    });
  }

  private createRisk(risk: RiskSave): Observable<any> {
    return this.riskService.create(risk)
      .catch((error) => Observable.throw(error))
      .do((result: RiskGet) => {
        this.riskId = result.id;
        let newModel = RiskViewModel.fromRiskGet(result);
        this.model = Object.assign(new RiskViewModel(), newModel);
      })
      .pipe(
        mergeMap(() => this.saveSuccess("eRisk.RiskForm.SuccessfullyCreated"))
      );
  }

  private updateRisk(id: number, risk: RiskSave): Observable<any> {

    return this.riskService.update(id, risk)
      .catch(error => {
        switch (error.status) {
          case 404:
            this.translateService.get("eRisk.RiskForm.NotFound", { id: id })
              .subscribe(message => this.toastrService.error(message));
            break;
          default:
            break;
        }
        return Observable.throw(error);
      }).pipe(
        mergeMap(() => this.saveSuccess("eRisk.RiskForm.SuccessfullyUpdated"))
      );
  }

  private saveSuccess(messageTranslationKey: string): Observable<any> {
    return this.translateService.get(messageTranslationKey).pipe(
      mergeMap((message) => this.toastrService.success(message).onHidden)
    );
  }

  private redirect() {
    let redirectRoute = "/e-risk/assessment";
    this.router.navigate([redirectRoute]);
  }
}
