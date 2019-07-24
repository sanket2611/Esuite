import { Injectable } from '@angular/core';
import { StatusEnum } from '../enums/status.enum';

@Injectable()
export class StatusService {

  constructor() { }

  get(): string[]{
    return [
      StatusEnum[StatusEnum.Opened],
      StatusEnum[StatusEnum.Completed],
      StatusEnum[StatusEnum.Closed],
      StatusEnum[StatusEnum.Cancelled]
    ];
  }
}