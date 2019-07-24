import { Injectable } from '@angular/core';
import { Chart, ChartOptions, CommonAxe } from 'chart.js';
import { TranslateService } from '@ngx-translate/core';
import 'chartjs-plugin-datalabels';

@Injectable()
export class ChartService {

  public readonly backgroundColors = [
    'rgb(0,141,76)',
    'rgb(219,139,11)',
    'rgb(211,55,36)',
    'rgb(135, 1, 1)',
    'rgb(0,167,208)',
    'rgb(85,82,153)',
    'rgb(255,119,1)',
    'rgb(48,187,187)',
    'rgb(0,26,53)',
    'rgb(53,124,165)'
  ];

  constructor(private translateService: TranslateService) { 
    Chart.defaults.global.plugins.datalabels.display = false;
  }

  getOptions(): ChartOptions{
    return {
      responsive: true,
      title: {
        display: true,
        fontSize: 16        
      },
      legend:{
        position: 'top'
      }
    };
  }

  destroyChart(chart: Chart){
    if(chart){
      chart.destroy();
    }
  }
}