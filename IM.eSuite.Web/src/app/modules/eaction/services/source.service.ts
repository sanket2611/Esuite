import { Injectable } from '@angular/core';
import { SelectItem } from '@im-angular/core';
import { SourceEnum } from '../enums/source.enum';

@Injectable()
export class SourceService {

  constructor() { }

  get(): SelectItem[]{
    let result = new Array<SelectItem>();

    for(let source in SourceEnum){      
      if (isNaN(Number(source))) {
        continue;
      }

      let i = new SelectItem();
      i.id = source;
      i.text = SourceEnum[source];
      result.push(i)
    }

    return result;
  }
}