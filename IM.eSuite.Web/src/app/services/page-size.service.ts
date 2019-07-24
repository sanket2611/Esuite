import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PageSizeViewModel, AbstractPageSizeService } from '@im-angular/core';
import { APPSETTINGS } from '../configs/appSettings';

@Injectable()
export class PageSizeService implements AbstractPageSizeService {

  constructor(private translateService: TranslateService) { }

  setPageSize(): PageSizeViewModel{
    let pageSizeVm = new PageSizeViewModel();
    pageSizeVm.pageSize = APPSETTINGS.PAGE_SIZE.DEFAULT_SIZE;
    pageSizeVm.sizes = APPSETTINGS.PAGE_SIZE.SIZES;    
    this.translateService.get("Core.PageSize.Label").subscribe(t => pageSizeVm.label = t);
    return pageSizeVm;
  }
}
