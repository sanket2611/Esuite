import { Component, OnInit, Input } from '@angular/core';
import { ChartData, ChartDataSets, ChartTooltipItem } from 'chart.js';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { ChartService } from '../../services/chart.service';
import { ReportingService } from '../../services/reporting.service';
import { ReportingFilterViewModel } from '../../viewModels/reporting-filter.viewModel';
import { ObservationByCategoryGet } from '../../models/observation-by-category-get.model';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-observation-by-category',
  templateUrl: './observation-by-category.component.html',
  styleUrls: ['./observation-by-category.component.less']
})
export class ObservationByCategoryComponent implements OnInit {
  isHorizontalBarChart: boolean = false;
  data: ObservationByCategoryGet[];
  private chart: Chart;
  private _model: ReportingFilterViewModel;
  
  @Input() get model(): ReportingFilterViewModel {
    return this._model;
  }  
  set model(value: ReportingFilterViewModel) {    
    this._model = value;
    if(value && value.plantId && value.dateRange && value.observationTypeId){
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
    this.isHorizontalBarChart = false;
    this.chartService.destroyChart(this.chart);  
    this.generateBarChart();
  }

  onHorizontalBarChartClicked(){    
    this.isHorizontalBarChart = true;
    this.chartService.destroyChart(this.chart);
    this.generateHorizontalBarChart();
  }

  private onModelChanged(){
    this.chartService.destroyChart(this.chart);
    this.data = undefined;
    this.isHorizontalBarChart = false;

    let request = this.model.toObservationReportingRequest();
    this.reportingService.getObservationByCategory(request)
      .subscribe(data => {
        if(!data || data.length == 0){
          this.translateService.get("eSMAT.Reporting.NoResult")
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
    options.legend.display = false;
    options.plugins = { datalabels: this.chartService.getDataLabelOptions() };

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: this.toBarChartModel(),
      options: options      
    });
  }

  private generateHorizontalBarChart(){
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

  private toBarChartModel(): ChartData {
    let dataset: ChartDataSets = {
      data: this.data.map(m =>m.count),
      backgroundColor: this.chartService.backgroundColors[0]      
    };

    return {
      labels: this.data.map(m => m.category),
      datasets: [dataset]
    };
  }
}