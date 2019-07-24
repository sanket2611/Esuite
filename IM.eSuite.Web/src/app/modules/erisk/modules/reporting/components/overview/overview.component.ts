import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { ReportingService } from '../../services/reporting.service';
import { ChartService } from '../../services/chart.service';
import { ReportingFilterViewModel } from '../../viewModels/reporting-filter.viewModel';
import { OverviewGet } from '../../models/overview-get.model';
import { Chart, ChartData, ChartDataSets } from 'chart.js';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.less']
})
export class OverviewComponent implements OnInit, OnDestroy {
  data: OverviewGet[];
  private chart: Chart;
  private numberOfUpToDateRisk: string;
  private numberOfNotUpToDateRisk: string;
  months: Array<string>;
  private _model: ReportingFilterViewModel;

  @Input() get model(): ReportingFilterViewModel {
    return this._model;
  }
  set model(value: ReportingFilterViewModel) {
    this._model = value;
    if (value && value.plantId && value.year) {
      this.onModelChanged();
    }
  }
  constructor(private reportingService: ReportingService, private chartService: ChartService,
    private translateService: TranslateService, private toastrService: ToastrService) {

    let locale = this.translateService.getBrowserLang();
    this.months = Array.from(Array(12).keys())
      .map(v => new Date(new Date().getFullYear(), v, 1).toLocaleString(locale, { month: "short" }));

  }

  ngOnInit() {
    this.translateService.get("eRisk.Reporting.NumberOfUpToDateRisk").subscribe(translation => this.numberOfUpToDateRisk = translation);
    this.translateService.get("eRisk.Reporting.NumberOfNotUpToDateRisk").subscribe(translation => this.numberOfNotUpToDateRisk = translation);
  }

  ngOnDestroy() {
    this.chartService.destroyChart(this.chart);
  }

  private onModelChanged() {
    this.chartService.destroyChart(this.chart);
    this.data = undefined;

    let request = this.model.toReportingRequest();
    let serviceCall = this.reportingService.getOverview(request);
    serviceCall.subscribe(data => {
      if (!data || data.length == 0) {
        this.translateService.get("eRisk.Reporting.NoResult")
          .subscribe(message => this.toastrService.warning(message));
        return;
      }
      this.data = data;
      this.generateBarChart();
    });
  }


  private generateBarChart() {
    let canvas = <HTMLCanvasElement>document.getElementById('chart');
    let ctx = canvas.getContext('2d');
    let options = this.chartService.getOptions();
    options.scales = {
      xAxes: [{ stacked: true, maxBarThickness: 20 }],
      yAxes: [{ stacked: true, ticks: { beginAtZero: true } }]
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
      label: this.numberOfUpToDateRisk,
      data: this.data.map(m => m.countUpToDateRisk),
      backgroundColor: this.chartService.backgroundColors[0]
    },
    {
      label: this.numberOfNotUpToDateRisk,
      data: this.data.map(m => m.countNotUpToDateRisk),
      backgroundColor: this.chartService.backgroundColors[3]
    }];

    return {
      labels: this.data.map(m => this.months[m.monthNumber - 1]),
      datasets: datasets
    };
  }
}
