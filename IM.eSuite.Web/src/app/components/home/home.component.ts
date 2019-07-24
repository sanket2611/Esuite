import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Application } from '../../models/application';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  applications: Array<Application>;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.applications = this.route.snapshot.data['applications'];
  }

  isEnabled(applicationId: number): boolean {
    return this.applications.some(a => a.id == applicationId);
  }
}