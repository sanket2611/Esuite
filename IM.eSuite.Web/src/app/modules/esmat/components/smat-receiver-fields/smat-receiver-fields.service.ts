import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { SmatReceiverService } from '../../services/smat-receiver.service';
import { SmatReceiverSave } from '../../models/smat-receiver-save.model';

@Injectable()
export class SmatReceiverFieldsService {

  constructor(private smatReceiverService: SmatReceiverService, private translateService: TranslateService,
    private toastrService: ToastrService, private router: Router) { }
  
  createSmatReceiver(smatReceiver: SmatReceiverSave): Observable<SmatReceiverSave>{
    return this.smatReceiverService.create(smatReceiver).do(
      result => {
        this.saveSuccess("eSMAT.SmatReceiver.SuccessfullyCreated", smatReceiver);           
      });
  }

  updateSmatReceiver(smatReceiver: SmatReceiverSave): Observable<any>{
    
    return this.smatReceiverService.update(smatReceiver).do(result => {
        this.saveSuccess("eSMAT.SmatReceiver.SuccessfullyUpdated", smatReceiver);
      },
      error => {
        if(error){          
          switch(error.status){
            case 404:
              this.translateService.get("eSMAT.SmatReceiver.NotFound", { id: smatReceiver.id })
                .subscribe(message => this.toastrService.error(message));              
              break;
            default:
              break;
          }
        }
      });
  }

  private saveSuccess(messageTranslationKey: string, smatReceiver: SmatReceiverSave)
  {
    this.translateService.get(messageTranslationKey, smatReceiver)
      .subscribe(message => { 
        this.toastrService.success(message).onHidden.subscribe();            
      });
  }
}