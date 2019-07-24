import { Injectable } from '@angular/core';
import { ListRequest, SortViewModel } from '@im-angular/core';

@Injectable()
export class ListRequestService {

  constructor() { }

  getListRequest<T extends ListRequest>(t: { new(): T }, pageNumber: number, pageSize: number, sortVm: SortViewModel): T {
    let request = new t();
    request.pageNumber = pageNumber;
    request.pageSize = pageSize;

    if (sortVm) {
      request.isDescending = sortVm.isDescending;
      request.sortBy = sortVm.sortBy;
    }

    return request;
  }
}