import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { ReportingService } from '../../services/reporting.service';
import { ChartService } from '../../services/chart.service';
import { ReportingFilterViewModel } from '../../viewModels/reporting-filter.viewModel';
import { Chart, ChartData, ChartDataSets } from 'chart.js';
import { ScoringByOrganizationGet } from '../../models/scoring-by-organization-get.model';

@Component({
  selector: 'app-scoring-by-organization',
  templateUrl: './scoring-by-organization.component.html',
  styleUrls: ['./scoring-by-organization.component.less']
})
export class ScoringByOrganizationComponent implements OnInit, OnDestroy {
  data: ScoringByOrganizationGet[];
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
    this.data = undefined;

    let request = this.model.toReportingRequest();
    this.reportingService.getScoringByOrganization(request)
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

    options.legend.display = false;
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: this.toBarChartModel(),      
      options: options      
    });
  }

  private toBarChartModel(): ChartData {
    let dataset: ChartDataSets = {
      data: this.data.map(m => m.sumScores),
      backgroundColor: this.chartService.backgroundColors[1]      
    };

    return {
      labels: this.data.map(m => m.organization),
      datasets: [dataset]
    };
  }  
}