import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tile',
  templateUrl: './application-tile.component.html',
  styleUrls: ['./application-tile.component.less']
})
export class ApplicationTileComponent implements OnInit {
  @Input('is-enabled')isEnabled: boolean;
  @Input()link: string;
  @Input('background-class')backgroundClass: string;
  @Input('icon-class')iconClass: string;
  @Input()title: string;
  constructor() { }

  ngOnInit() {
  }

}
