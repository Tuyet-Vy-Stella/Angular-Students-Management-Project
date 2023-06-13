import { Component, OnInit } from '@angular/core';
import {
    StudentGenderPercentage,
    StudentGenderService,
} from '../../services/intern-gender.service';

import {
    ApexChart,
    ApexNonAxisChartSeries,
    ApexResponsive,
} from 'ng-apexcharts';

@Component({
    selector: 'app-intern-gender-chart',
    templateUrl: './intern-gender-chart.component.html',
    styleUrls: ['./intern-gender-chart.component.scss'],
})
export class StudentGenderChartComponent implements OnInit {
    studentGenderPercentage!: StudentGenderPercentage;

    series: ApexNonAxisChartSeries = [];
    chart: ApexChart = { type: 'donut', height: 285 };
    responsive: ApexResponsive[] = [
        {
            breakpoint: 480,
            options: {
                chart: {
                    width: 200,
                },
                legend: {
                    position: 'bottom',
                },
            },
        },
    ];
    labels: string[] = ['Female', 'Male'];

    constructor(private studentGenderService: StudentGenderService) {}

    ngOnInit() {
        this.studentGenderService.getStudentGender().subscribe({
            next: (response) => {
                if (response) {
                    this.studentGenderPercentage = response;
                    this.series = [
                        this.studentGenderPercentage.percentage_female,
                        this.studentGenderPercentage.percentage_male,
                    ];
                }
            },
            error: (error) => {
                console.log(error);
            },
        });
    }
}
