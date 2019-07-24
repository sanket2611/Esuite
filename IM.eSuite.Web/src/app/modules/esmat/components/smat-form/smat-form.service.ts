import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs/Observable';
import { mergeMap, concatMap } from 'rxjs/operators';
import { SmatService } from '../../services/smat.service';
import { ObservationService } from '../../services/observation.service';
import { EsmatActionPlanService } from '../../services/esmat-action-plan.service';
import { SmatSave } from '../../models/smat-save.model';
import { SmatGet } from '../../models/smat-get.model';
import { SmatViewModel } from '../../viewModels/smat.viewModel';
import { ObservationViewModel } from '../../viewModels/observation.viewModel';
import { ActionViewModel } from '../../viewModels/action.viewModel';
import { ActionPlanGet } from '../../../eaction/models/action-plan-get.model';
import { ObservationSave } from '../../models/observation-save.model';
import { ScheduleViewModel } from '../../viewModels/schedule.viewModel';

@Injectable()
export class SmatFormService {
  private model: SmatViewModel;

  constructor(private smatService: SmatService, private translateService: TranslateService,
    private observationService: ObservationService, private eSmatActionPlanService: EsmatActionPlanService,
    private toastrService: ToastrService, private router: Router) { }  
  
  saveSmat(id: number, model: SmatViewModel, files: File[]): Observable<any> {
    this.model = model;
    let smat  = Object.assign(new SmatViewModel(), model)
      .toSmatSave();
    
    let saveObservable = id ? this.updateSmat(id, smat)
      : this.createSmat(smat);

    let actionPlans = this.model.observations.filter(o => o.actionPlan && !o.actionPlanId)
      .map(o => o.actionPlan);

    if(actionPlans.length > 0){

      saveObservable = saveObservable.pipe(
        mergeMap(() => Observable.from(actionPlans)),
        mergeMap((actionPlan: ActionViewModel, index: number ) => {
          let model = Object.assign(new ActionViewModel(), actionPlan)
            .toActionPlanSave();
          let observation = this.model.observations[index];
          model.sourceId = observation.id;
          
          let schedule = Object.assign(new ScheduleViewModel(), this.model.schedule);          
          model.location = schedule.toLocationSave();

          return this.eSmatActionPlanService.create(model)
            .pipe(
              mergeMap((ap: ActionPlanGet) => {
                let model = new ObservationSave();
                model.actionPlanId = ap.id;
                return this.observationService.update(ap.sourceId, model);
              })
            );
        }),
        mergeMap(() => this.translateService.get("eSMAT.Smat.ActionPlanSuccessfullySaved")),
        mergeMap(message => this.toastrService.success(message).onHidden));          
    }
    
    let totalImages = files.filter(f => f != undefined && f != null).length;
    
    if(totalImages > 0){

      var counter = 0;
      saveObservable = saveObservable.pipe(
        mergeMap(() => this.translateService.get("eSMAT.Smat.UploadingImages")),
        mergeMap((message) => this.toastrService.info(message).onShown),
        mergeMap(() => Observable.from(files)),
        concatMap((file: File, index: number) => {
          if(!file){
            return Observable.of();
          }
          let form = new FormData();
          form.append("file", file);
          counter++;
          let id = this.model.observations[index].id;
          return this.observationService.uploadImage(id, form)
            .catch(error => {              
              if(error.status == 400){
                this.toastrService.error(error.error);
              }
              return Observable.throw(error);
            }).pipe(
            mergeMap(() => this.translateService.get("eSMAT.Smat.SuccessfullyUploadedImage", {index: counter, total: totalImages})),
            mergeMap(message => this.toastrService.success(message).onHidden));
        }));
    }

    saveObservable = saveObservable.do(() => this.redirect(id));

    return saveObservable;
  }

  private createSmat(smat: SmatSave): Observable<any>{
    return this.smatService.create(smat)
    .catch((error) => Observable.throw(error))
    .do((result: SmatGet) => {      
      let newModel = SmatViewModel.fromSmatGet(result);
      let observations = result.observations.map(o => ObservationViewModel.fromObservationGet(o));
      newModel.observations = observations;      
      this.model = Object.assign(new SmatViewModel(), newModel);      
    })
    .pipe(      
      mergeMap(() => this.saveSuccess("eSMAT.Smat.SuccessfullyCreated"))
    );
  }

  private updateSmat(id: number, smat: SmatSave): Observable<any>{
    
    return this.smatService.update(id, smat)
      .catch(error => {
        switch(error.status){
          case 404:
            this.translateService.get("eSMAT.Smat.NotFound", { id: id })
              .subscribe(message => this.toastrService.error(message));              
            break;
          default:
            break;
        }
        return Observable.throw(error);
      }).pipe(        
        mergeMap(() => this.saveSuccess("eSMAT.Smat.SuccessfullyUpdated"))
      );
  }

  private saveSuccess(messageTranslationKey: string): Observable<any>
  {
    return this.translateService.get(messageTranslationKey).pipe(
      mergeMap((message) => this.toastrService.success(message).onHidden)
    );
  }

  private redirect(id: number){
    let redirectRoute = id ? "/e-smat/history" : "/e-smat";
    this.router.navigate([redirectRoute]);
  }
}
