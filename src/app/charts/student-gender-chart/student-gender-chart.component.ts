import { Component, OnInit, ViewChild } from '@angular/core';
import { StudentGenderPercentage, StudentGenderService } from './student-gender.service';

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart
} from "ng-apexcharts";
@Component({
  selector: 'app-student-gender-chart',
  templateUrl: './student-gender-chart.component.html',
  styleUrls: ['./student-gender-chart.component.scss']
})
export class StudentGenderChartComponent implements OnInit{

  studentGenderPercentage!: StudentGenderPercentage

  series: ApexNonAxisChartSeries = [];
  chart: ApexChart = {type: "donut", height: 277};
  responsive: ApexResponsive[] = [
    {
      breakpoint: 480,
      options: {
        chart: {
        width: 200
        },
      legend: {
        position: "bottom"
      }
    }
  }];
  labels: any = ["Female", "Male"];

  constructor(private studentGenderService: StudentGenderService) {
  }

  ngOnInit(){
    this.studentGenderService.getStudentGender().subscribe({
      next: (response) => {
        if (response){
          this.studentGenderPercentage = response;
          this.series = [this.studentGenderPercentage.percentage_female, this.studentGenderPercentage.percentage_male]
        }
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

}
