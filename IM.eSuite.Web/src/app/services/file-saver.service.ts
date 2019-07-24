import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import * as FileSaver from 'file-saver';

@Injectable()
export class FileSaverService {

  constructor() { }

  saveToFileSystem(response: HttpResponse<Blob>){       
    let contentDispositionHeader: string = response.headers.get('Content-Disposition');
    let parts: string[] = contentDispositionHeader.split(';');
    let filename = parts[1].split('=')[1];    
    let blob = new Blob([response.body], { type: response.headers.get("Content-Type") });    
    FileSaver.saveAs(blob, filename);
  }
}