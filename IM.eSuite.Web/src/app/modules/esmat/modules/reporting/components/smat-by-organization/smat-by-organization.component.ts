import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { ReportingService } from '../../services/reporting.service';
import { ChartService } from '../../services/chart.service';
import { ReportingFilterViewModel } from '../../viewModels/reporting-filter.viewModel';
import { SmatByOrganizationGet } from '../../models/smat-by-organization-get.model';
import { Chart, ChartTooltipItem, ChartData, ChartDataSets } from 'chart.js';

@Component({
  selector: 'app-smat-by-organization',
  templateUrl: './smat-by-organization.component.html',
  styleUrls: ['./smat-by-organization.component.less']
})
export class SmatByOrganizationComponent implements OnInit, OnDestroy {
  isBarChart: boolean = false;
  data: SmatByOrganizationGet[];
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

  onBarChartClicked(){
    this.isBarChart = true;
    this.chartService.destroyChart(this.chart);  
    this.generateBarChart();
  }

  onPieChartClicked(){    
    this.isBarChart = false;
    this.chartService.destroyChart(this.chart);
    this.generatePieChart();
  }

  private onModelChanged(){
    this.chartService.destroyChart(this.chart);
    this.data = undefined;
    this.isBarChart = false;

    let request = this.model.toSmatByOrganizationRequest();
    this.reportingService.getSmatByOrganization(request)
      .subscribe(data => {
        if(!data || data.length == 0){
          this.translateService.get("eSMAT.Reporting.NoResult")
            .subscribe(message => this.toastrService.warning(message));          
          return;
        }

        this.data = data;        
        this.generatePieChart();        
      });
  }  

  private generatePieChart(){       
    let canvas = <HTMLCanvasElement>document.getElementById('chart');
    let ctx = canvas.getContext('2d');
    let options = this.chartService.getOptions();
    options.tooltips = {
      callbacks: {
        label: function(tooltipItem: ChartTooltipItem, data: ChartData){
          var dataset = data.datasets[tooltipItem.datasetIndex];
          var total = (<number[]>dataset.data).reduce((sum, current) => sum + current);
          var currentValue = <number>dataset.data[tooltipItem.index];
          var percentage = Math.floor(((currentValue/total) * 100));         
          return `${data.labels[tooltipItem.index]}: ${percentage} %`;
        }
      }
    }
    
    this.chart = new Chart(ctx, {
      type: 'pie',
      data: this.toPieChartModel(),      
      options: options      
    });
  }

  private generateBarChart(){
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
      data: this.toBarChartModel(),      
      options: options      
    });
  }

  private toPieChartModel(): ChartData {
    let dataset = {
      data: this.data.map(m => m.count),      
      backgroundColor: this.chartService.backgroundColors
    };    
    return {
      labels: this.data.map(m => m.organization),
      datasets: [dataset]
    };
  }

  private toBarChartModel(): ChartData {
    let dataset: ChartDataSets = {
      data: this.data.map(m =>m.count),
      backgroundColor: this.chartService.backgroundColors[0]      
    };

    return {
      labels: this.data.map(m => m.organization),
      datasets: [dataset]
    };
  }  
}