import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { ReportingService } from '../../services/reporting.service';
import { ReportingService as eActionReportingService}  from '../../../../../eaction/services/reporting.service';
import { ChartService } from '../../services/chart.service';
import { ReportingFilterViewModel } from '../../viewModels/reporting-filter.viewModel';
import { Chart, ChartTooltipItem, ChartData } from 'chart.js';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { ActionByStatusGet } from '../../../../../eaction/models/action-by-status-get';
import { environment } from '../../../../../../../environments/environment';

@Component({
  selector: 'app-action-by-status',
  templateUrl: './action-by-status.component.html',
  styleUrls: ['./action-by-status.component.less']
})
export class ActionByStatusComponent implements OnInit, OnDestroy {
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
  constructor(private reportingService: ReportingService, private eActionReportingService: eActionReportingService, private chartService: ChartService, 
    private translateService: TranslateService, private toastrService: ToastrService) { }

  ngOnInit() {
  }

  ngOnDestroy(){
    this.chartService.destroyChart(this.chart);
  }

  private onModelChanged(){
    this.chartService.destroyChart(this.chart);    

    let request = this.model.toReportingRequest();    ;
    
    forkJoin(this.eActionReportingService.getActionPlanByStatus(request, environment.eActionApi.keyId.eSmat),
      this.reportingService.getImmediateAction(request))
      .subscribe(results => {
        if(!results || !results[0] || (results[0].length == 0 && !results[1])){
          this.translateService.get("eSMAT.Reporting.NoResult")
            .subscribe(message => this.toastrService.warning(message));          
          return;
        }

        if(results[1] > 0){
          let immediateAction = new ActionByStatusGet();
          immediateAction.count = results[1];
          this.translateService.get('eSMAT.Reporting.ImmediateAction')
            .subscribe(message => immediateAction.status = message);
          
          results[0].push(immediateAction);
        }
        
        this.generateChart(results[0]);
      });
  }  

  private generateChart(data: ActionByStatusGet[]){       
    let canvas = <HTMLCanvasElement>document.getElementById('chart');
    let ctx = canvas.getContext('2d');
    let options = this.chartService.getOptions();
    options.tooltips = {
      callbacks: {
        label: function(tooltipItem: ChartTooltipItem, data: ChartData){
          var dataset = data.datasets[tooltipItem.datasetIndex];
          var total = (<number[]>dataset.data).reduce((sum, current) => sum + current);
          var currentValue = <number>dataset.data[tooltipItem.index];
          var percentage = +(((currentValue/total) * 100).toFixed(2));          
          return `${data.labels[tooltipItem.index]}: ${currentValue} / ${percentage} %`;
        }
      }
    }
    
    this.chart = new Chart(ctx, {
      type: 'pie',
      data: this.toChartModel(data),      
      options: options      
    });
  }

  private toChartModel(data: ActionByStatusGet[]): ChartData {
    let dataset = {
      data: data.map(a => a.count),      
      backgroundColor: this.chartService.backgroundColors
    };    
    return {
      labels: data.map(a => a.status),
      datasets: [dataset]
    };
  }
}