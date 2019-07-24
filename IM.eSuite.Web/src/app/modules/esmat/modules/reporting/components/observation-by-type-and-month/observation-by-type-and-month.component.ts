import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { ReportingService } from '../../services/reporting.service';
import { ChartService } from '../../services/chart.service';
import { ObservationTypeEnum } from '../../../../enums/observation-type.enum';
import { ObservationByTypeAndMonthGet } from '../../models/observation-by-type-and-month-get.model';
import { ReportingFilterViewModel } from '../../viewModels/reporting-filter.viewModel';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-observation-by-type-and-month',
  templateUrl: './observation-by-type-and-month.component.html',
  styleUrls: ['./observation-by-type-and-month.component.less']
})
export class ObservationByTypeAndMonthComponent implements OnInit, OnDestroy {
  private colors = ['#dff0d8', '#f2dede', '#fcf8e3'];  
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
    this.reportingService.getObservationByTypeAndMonth(request)
      .subscribe(data => {
        if(!data || data.length == 0){
          this.translateService.get("eSMAT.Reporting.NoResult")
            .subscribe(message => this.toastrService.warning(message));          
          return;
        }
        this.generateChart(data)
      });
  }

  private generateChart(model: ObservationByTypeAndMonthGet[]){       
    let canvas = <HTMLCanvasElement>document.getElementById('chart');
    let ctx = canvas.getContext('2d');
    let xAxe = this.chartService.getTimeScale();
    xAxe.stacked = true;
    let options = this.chartService.getOptions();    
    options.scales = {
      xAxes: [xAxe],
      yAxes: [{
        stacked: true
      }]
    };

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: this.toChartModel(model),      
      options: options      
    });
  }

  private toChartModel(model: ObservationByTypeAndMonthGet[]): any {
    
    let datasets = model.map(i => {
      let label;
      this.translateService.get('eSMAT.Smat.' + ObservationTypeEnum[i.type])
        .subscribe(m => label = m);        
      
      return {          
        data: i.data,
        label: label,
        backgroundColor: this.colors[i.type - 1]
      };
    });

    return {
      labels: this.chartService.getDateLabels(this.model.dateRange[0], 
        this.model.dateRange[1]), 
      datasets: datasets
    };
  }
}