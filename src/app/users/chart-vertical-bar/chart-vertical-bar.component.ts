import { Component } from '@angular/core';
import { Chart, ChartType } from 'chart.js/auto';
import { AppFacade } from 'src/app/+state/app.facade';
import { UserFollowers } from 'src/lib/models/users.model';

@Component({
  selector: 'app-chart-vertical-bar',
  templateUrl: './chart-vertical-bar.component.html',
  styleUrls: ['./chart-vertical-bar.component.scss']
})
export class ChartVerticalBarComponent {

  public chart: Chart;
  followerUser:UserFollowers[];
  constructor(
    readonly appFacade:AppFacade
  ){}
  ngOnInit(): void {
    this.appFacade.followersUser$
      .subscribe((follow:UserFollowers[]) => {
          this.followerUser = follow;
          let arrayLabels = this.followerUser.map(obj => obj?.login);
          let arrayData = this.followerUser.map(obj => obj?.follow);
          this.chartVerticalBar(arrayLabels,arrayData)
          
          
    });
  }

  chartVerticalBar(arrayLabels:any,arrayData:any){
    if(arrayData.length && arrayLabels.length){
      const data = {
      labels: arrayLabels,
      datasets: [{
        label: 'My First Dataset',
        data: arrayData,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)',
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
        ],
        borderWidth: 1
      }]
    };
  
    // Creamos la gráfica
    if(this.chart){
      this.chart.destroy();
    }
    this.chart = new Chart("chart", {
      type: 'bar' as ChartType, 
      data: data, 
      options: { 
        scales: {
          y: {
            beginAtZero: true
          }
        }
      },
    });
    }
    
  }
}
