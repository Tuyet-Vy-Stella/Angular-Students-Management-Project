import { Component, OnInit, ViewChild} from '@angular/core';
import { PercentageMark, AnnualLearningKindService } from './annual-learning-kind.service';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle
} from "ng-apexcharts";

@Component({
  selector: 'app-annual-learning-kind',
  templateUrl: './annual-learning-kind.component.html',
  styleUrls: ['./annual-learning-kind.component.scss']
})

export class AnnualLearningKindComponent implements OnInit {

  percentageMark!: PercentageMark

  series: ApexAxisChartSeries = [
    {
    name: '',
    data: []
    }
  ];
  chart: ApexChart = {height: 277, type: "bar"};
  xaxis: ApexXAxis = {categories: ["Good", "Fairly",  "Medium",  "Bad"]};
  title: ApexTitleSubtitle = {text: "Annual Learning Kind (%)"};

  constructor(private annualLearningKindService: AnnualLearningKindService ){}

  ngOnInit(){
    this.annualLearningKindService.getPercentageMark().subscribe({
      next: (response) => {
        if (response) {
          this.percentageMark = response;
          this.series = [
            {
              name: 'My-series',
              data: [this.percentageMark.percentage_good, this.percentageMark.percentage_fairly, this.percentageMark.percentage_medium, this.percentageMark.percentage_bad]
            }
          ]
        }
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
  }
