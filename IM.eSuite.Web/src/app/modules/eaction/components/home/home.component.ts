import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AbstractDataTable } from '@im-angular/core';
import { AuthorizationService } from '@im-angular/authentication';
import { PageSizeService } from '../../../../services/page-size.service';
import { TranslateService } from '@ngx-translate/core';
import { ListRequestService } from '../../../../services/list-request.service';
import { ActionPlanService } from '../../services/action-plan.service';
import { FileSaverService } from '../../../../services/file-saver.service';
import { ActionPlanList } from '../../models/action-plan-list.model';
import { ActionPlanListRequest } from '../../models/action-plan-list-request.model';
import { environment } from '../../../../../environments/environment';
import { ActionPlanFilterViewModel } from '../../viewModels/action-plan-filter.viewModel';
import { SourceEnum } from '../../enums/source.enum';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent extends AbstractDataTable<ActionPlanList> implements OnInit {
  locale: string;
  actionPlanFilter: ActionPlanFilterViewModel;
  isExportInProgress: boolean;

  constructor(private route: ActivatedRoute, private actionPlanService: ActionPlanService, private translateService: TranslateService, 
    private fileSaverService: FileSaverService, private listRequestService: ListRequestService, public authorizationService: AuthorizationService,
    pageSizeService: PageSizeService) { 
    super(pageSizeService);
  }

  ngOnInit() {    
    this.locale = this.translateService.currentLang;
    this.data = this.route.snapshot.data['actions'];
    this.updatePagerVm(1);
    this.actionPlanFilter = new ActionPlanFilterViewModel();
  }

  loadPage(i: number){
    let request = this.getListRequest(i);
    this.actionPlanService.list(environment.eActionApi.keyId.eAction, request).subscribe(response => {
      this.data = response;
      this.updatePagerVm(i);
     });
  }

  onActionPlanFiltered(actionPlanFilter: ActionPlanFilterViewModel){
    this.actionPlanFilter = actionPlanFilter;
    this.loadPage(1);
  }

  onActionPlanFilterRemoved(){
    this.actionPlanFilter = new ActionPlanFilterViewModel();
    this.loadPage(1);
  }

  getLink(action: ActionPlanList): (string | number)[]{
    switch (SourceEnum[action.source]) {
      case SourceEnum.eSMAT:
        return ['/e-smat', action.sourceId, 'action', action.id ];
      default:
        return ['form', action.id];
    }
  }

  private getListRequest(pageNumber: number): ActionPlanListRequest {
    let request = this.listRequestService.getListRequest(ActionPlanListRequest, pageNumber, 
      this.pageSizeVm.pageSize, this.sortVm);
    
    request.plantId = this.actionPlanFilter.plantId;
    request.search = this.actionPlanFilter.search;
    request.application = this.actionPlanFilter.source;
    return request;
  }

  onExportClicked(){
    this.isExportInProgress = true;
    this.actionPlanService.export(environment.eActionApi.keyId.eAction, this.actionPlanFilter.plantId, this.actionPlanFilter.source, this.actionPlanFilter.search)
      .finally(() => this.isExportInProgress = false)
      .subscribe(result => this.fileSaverService.saveToFileSystem(result));
  }
}
