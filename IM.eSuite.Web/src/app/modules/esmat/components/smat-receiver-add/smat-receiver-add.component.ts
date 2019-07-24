import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { SelectItem } from '@im-angular/core';
import { SmatReceiverList } from '../../models/smat-receiver-list.model';
import { SmatReceiverViewModel } from '../../viewModels/smat-receiver.viewModel';

@Component({
  selector: 'app-smat-receiver-add',
  templateUrl: './smat-receiver-add.component.html',
  styleUrls: ['./smat-receiver-add.component.less']
})
export class SmatReceiverAddComponent implements OnInit {
  @Input() modal: BsModalRef;
  @Input() plant: SelectItem;
  @Input() reset: boolean;
  @Output() resetChange = new EventEmitter<boolean>(true);  
  @Output() addedReceiverRequest = new EventEmitter<SmatReceiverList>();
    
  constructor() { }

  ngOnInit() {    
  }

  onReceiverCreated(receiver: SmatReceiverViewModel){    
    let model = new SmatReceiverList();
    model.id = receiver.id;
    model.name = `${receiver.firstName} ${receiver.lastName}`;
    this.addedReceiverRequest.emit(model);
  }
}