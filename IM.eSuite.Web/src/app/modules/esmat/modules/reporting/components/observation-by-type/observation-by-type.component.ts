import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { ReportingService } from '../../services/reporting.service';
import { ChartService } from '../../services/chart.service';
import { ObservationByTypeGet } from '../../models/observation-by-type-get.model';
import { ReportingFilterViewModel } from '../../viewModels/reporting-filter.viewModel';
import { Chart, ChartData, ChartDataSets } from 'chart.js';
import { ObservationTypeEnum } from '../../../../enums/observation-type.enum';

@Component({
  selector: 'app-observation-by-type',
  templateUrl: './observation-by-type.component.html',
  styleUrls: ['./observation-by-type.component.less']
})
export class ObservationByTypeComponent implements OnInit, OnDestroy {
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
    this.reportingService.getObservationByType(request)
      .subscribe(data => {
        if(!data || data.length == 0){
          this.translateService.get("eSMAT.Reporting.NoResult")
            .subscribe(message => this.toastrService.warning(message));          
          return;
        }
        this.generateBarChart(data);
      });
  }  

  private generateBarChart(data: ObservationByTypeGet[]){       
    let canvas = <HTMLCanvasElement>document.getElementById('chart');    
    let ctx = canvas.getContext('2d');
    let options = this.chartService.getOptions();
    options.legend.display = false;
    options.scales = {      
      yAxes: [
        {
          id: 'observation-number-axis',          
          ticks: { beginAtZero: true }
        },
        {
          id: 'percentage-axis',          
          position: 'right',
          ticks: {
            min: 0,
            max: 101,
            callback: function(value) {
                if(value == 101){
                  return "";
                }
                return value + "%"
            }
          }, 
          gridLines : { display: false }
        }
      ]
    };    

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: this.toBarChartModel(data),
      options: options
    });
  }

  private toBarChartModel(data: ObservationByTypeGet[]): ChartData {
    let labels = new Array<string>();
    data.forEach((o) => {      
      this.translateService.get('eSMAT.Smat.' + ObservationTypeEnum[o.type])
        .subscribe(m => labels.push(m));
    });

    let datalabels = this.chartService.getDataLabelOptions();
    datalabels.backgroundColor = data.map((o, index) => this.chartService.backgroundColors[index]);
    datalabels.align = 'bottom';
    let barData = data.map(o => o.count);
    let barDataSet = {
      data: barData,
      backgroundColor: data.map((o, index) => this.chartService.backgroundColors[index]),
      yAxisID: 'observation-number-axis',
      datalabels: datalabels
    };

    let total = barData.reduce((sum, current) => sum + current);
    let lineData = new Array<number>();
    let sum = 0;
    for (let index = 0; index < barData.length; index++) {
      sum += barData[index];
      lineData.push(+((sum/total*100).toFixed(2)));
    }

    let lineDataSet: ChartDataSets = {
      type: 'line',
      data: lineData,
      yAxisID: 'percentage-axis',      
      borderColor: this.chartService.backgroundColors[data.length],
      fill: false,
    };

    return {
      datasets: [lineDataSet, barDataSet],
      labels: labels   
    };
  }
}