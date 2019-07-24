import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { ReportingService } from '../../services/reporting.service';
import { ChartService } from '../../services/chart.service';
import { ReportingFilterViewModel } from '../../viewModels/reporting-filter.viewModel';
import { PointDateGet } from '../../models/point-date-get.model';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-smat-by-month',
  templateUrl: './smat-by-month.component.html',
  styleUrls: ['./smat-by-month.component.less']
})
export class SmatByMonthComponent implements OnInit, OnDestroy {  
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

    let request = this.model.toReportingRequest();    
    this.reportingService.getSmatByMonth(request)
      .subscribe(data => {
        if(!data || data.length == 0){
          this.translateService.get("eSMAT.Reporting.NoResult")
            .subscribe(message => this.toastrService.warning(message));          
          return;
        }
        this.generateChart(data)
      });
  }

  private generateChart(model: PointDateGet[]){       
    let canvas = <HTMLCanvasElement>document.getElementById('chart');
    let ctx = canvas.getContext('2d');
    let options = this.chartService.getOptions();    
    options.scales = {
      xAxes: [this.chartService.getTimeScale()],
      yAxes: [{ ticks: { beginAtZero: true }}]
    };

    options.plugins = { datalabels: this.chartService.getDataLabelOptions() };
    options.plugins.datalabels.formatter = function(value: PointDateGet) {
      return value.y;
    };
    
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: this.toChartModel(model),      
      options: options      
    });
  }

  private toChartModel(model: PointDateGet[]): any {
    
    let label;
    this.translateService.get('eSMAT.Reporting.NumberOfSmat')
      .subscribe(m => label = m);

    let dataset = {
      data: model,
      label: label,
      backgroundColor: this.chartService.backgroundColors[0]
    };    
    return {
      labels: this.chartService.getDateLabels(this.model.dateRange[0], 
        this.model.dateRange[1]),
      datasets: [dataset]
    };
  }  
}