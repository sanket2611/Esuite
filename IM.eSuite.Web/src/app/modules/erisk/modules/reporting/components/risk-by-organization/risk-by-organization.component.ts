import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { ReportingService } from '../../services/reporting.service';
import { ChartService } from '../../services/chart.service';
import { ReportingFilterViewModel } from '../../viewModels/reporting-filter.viewModel';
import { RiskByOrganizationGet } from '../../models/risk-by-organization-get.model';
import { Chart, ChartData, ChartDataSets } from 'chart.js';

@Component({
  selector: 'app-risk-by-organization',
  templateUrl: './risk-by-organization.component.html',
  styleUrls: ['./risk-by-organization.component.less']
})
export class RiskByOrganizationComponent implements OnInit, OnDestroy {
  data: RiskByOrganizationGet[];
  private chart: Chart;
  private numberOfLowRisk: string;
  private numberOfMediumRisk : string;
  private numberOfCriticalRisk: string;
  private numberOfVeryCriticalRisk : string;

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
    this.translateService.get("eRisk.Reporting.NumberOfLowRisk").subscribe(translation => this.numberOfLowRisk = translation);
    this.translateService.get("eRisk.Reporting.NumberOfMediumRisk").subscribe(translation => this.numberOfMediumRisk = translation);
    this.translateService.get("eRisk.Reporting.NumberOfCriticalRisk").subscribe(translation => this.numberOfCriticalRisk = translation);
    this.translateService.get("eRisk.Reporting.NumberOfVeryCriticalRisk").subscribe(translation => this.numberOfVeryCriticalRisk = translation);
  }

  ngOnDestroy(){
    this.chartService.destroyChart(this.chart);
  }

  private onModelChanged(){
    this.chartService.destroyChart(this.chart);
    this.data = undefined;

    let request = this.model.toReportingRequest();
    this.reportingService.getRiskByOrganization(request)
      .subscribe(data => {
        if(!data || data.length == 0){
          this.translateService.get("eRisk.Reporting.NoResult")
            .subscribe(message => this.toastrService.warning(message));          
          return;
        }

        this.data = data;        
        this.generateBarChart();        
      });
  }  


  private generateBarChart(){
    let canvas = <HTMLCanvasElement>document.getElementById('chart');    
    let ctx = canvas.getContext('2d');
    let options = this.chartService.getOptions();
    options.scales = {
      xAxes: [{stacked: true, maxBarThickness: 20 }],
      yAxes: [{stacked: true, ticks: { beginAtZero: true }}]
    };

    options.legend.display = true;
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: this.toBarChartModel(),      
      options: options      
    });
  }

  private toBarChartModel(): ChartData {
    let datasets: ChartDataSets[] = [{
      label: this.numberOfLowRisk,
      data: this.data.map(m => m.countLowRisk),
      backgroundColor: this.chartService.backgroundColors[0]      
    },
    {
      label: this.numberOfMediumRisk,
      data: this.data.map(m => m.countMediumRisk),
      backgroundColor: this.chartService.backgroundColors[1]      
    },
    {
      label: this.numberOfCriticalRisk,
      data: this.data.map(m => m.countCriticalRisk),
      backgroundColor: this.chartService.backgroundColors[2]      
    },
    {
      label: this.numberOfVeryCriticalRisk,
      data: this.data.map(m => m.countVeryCriticalRisk),
      backgroundColor: this.chartService.backgroundColors[3]      
    }];

    return {
      labels: this.data.map(m => m.organization),
      datasets: datasets
    };
  }  
}