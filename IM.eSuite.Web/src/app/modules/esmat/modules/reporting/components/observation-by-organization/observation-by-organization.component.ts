import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { ChartService } from '../../services/chart.service';
import { ReportingService } from '../../services/reporting.service';
import { ReportingFilterViewModel } from '../../viewModels/reporting-filter.viewModel';
import { Chart, ChartDataSets, ChartData } from 'chart.js';
import { ObservationByOrganizationGet } from '../../models/observation-by-organization-get.model';

@Component({
  selector: 'app-observation-by-organization',
  templateUrl: './observation-by-organization.component.html',
  styleUrls: ['./observation-by-organization.component.less']
})
export class ObservationByOrganizationComponent implements OnInit, OnDestroy {  
  private chart: Chart;
  private _model: ReportingFilterViewModel;
  
  @Input() get model(): ReportingFilterViewModel {
    return this._model;
  }  
  set model(value: ReportingFilterViewModel) {    
    this._model = value;
    if(value && value.plantId && value.dateRange){
      this.onModelChanged();
    }    
  }
  constructor(private reportingService: ReportingService, private chartService: ChartService, 
    private translateService: TranslateService, private toastrService: ToastrService) { }

  ngOnInit() {
  }

  ngOnDestroy(){
    this.chartService.destroyChart(this.chart);
  }

  private onModelChanged(){
    this.chartService.destroyChart(this.chart);    

    let request = this.model.toObservationReportingRequest();
    this.reportingService.getObservationByOrganization(request)
      .subscribe(data => {
        if(!data || data.length == 0){
          this.translateService.get("eSMAT.Reporting.NoResult")
            .subscribe(message => this.toastrService.warning(message));          
          return;
        }

        this.generateChart(data);
      });
  }

  private generateChart(data: ObservationByOrganizationGet[]){
    let canvas = <HTMLCanvasElement>document.getElementById('chart');    
    let ctx = canvas.getContext('2d');
    let options = this.chartService.getOptions();
    options.scales = {
      yAxes: [{ maxBarThickness: 20 }],
      xAxes: [{ ticks: { beginAtZero: true }}]
    };

    options.legend.display = false;
    this.chart = new Chart(ctx, {
      type: 'horizontalBar',
      data: this.toBarChartModel(data),
      options: options      
    });
  }

  private toBarChartModel(data: ObservationByOrganizationGet[]): ChartData {
    let dataset: ChartDataSets = {
      data: data.map(m => m.count),
      backgroundColor: this.chartService.backgroundColors[0]      
    };

    return {
      labels: data.map(m => m.organization),
      datasets: [dataset]
    };
  }
}