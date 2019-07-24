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
        position: 'right'
      }
    };
  }

  getTimeScale(): CommonAxe{
    let locale = this.translateService.getBrowserLang();    
    return {
      type: 'time',      
      ticks:{
        callback: function(value, index, values) {          
          if(!values || !values[index]){
            return value;
          }

          let date = new Date(values[index].value);                  
          return date.toLocaleString(locale, { month: "long" });          
        }
      }
    }
  }

  getDateLabels(startDate: Date, endDate: Date): Date[]{
        
    let firstLabel = new Date(startDate);
    firstLabel.setDate(1);
    firstLabel.setMonth(firstLabel.getMonth() - 1);

    let lastLabel = new Date(endDate);
    lastLabel.setDate(1);
    lastLabel.setMonth(lastLabel.getMonth() + 1);    
    
    let months = this.monthDiff(firstLabel, lastLabel);    
    let labels = [firstLabel];

    for (let index = 0; index < months; index++) {
      let date = new Date(firstLabel);
      date.setMonth(date.getMonth() + index + 1);
      date.setDate(1);
      labels.push(date);
    }

    labels.push(lastLabel);
    return labels;
  }

  getDataLabelOptions(): any {    
    return {
      color: 'white',
      backgroundColor: this.backgroundColors[0],
      borderRadius: 4,
      anchor: 'end',
      align: 'top',
      display: true,
      font: {
        weight: 'bold'        
      }
    };
  }

  destroyChart(chart: Chart){
    if(chart){
      chart.destroy();
    }
  }

  private monthDiff(d1: Date, d2: Date): number {    
    let months = (d2.getFullYear() - d1.getFullYear()) * 12;    
    months -= d1.getMonth() + 1;    
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
  }
}