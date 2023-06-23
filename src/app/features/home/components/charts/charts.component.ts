import { teams } from './../../../team/team.data';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-charts',
    templateUrl: './charts.component.html',
    styleUrls: ['./charts.component.scss'],
})
export class ChartsComponent implements OnInit {
    data: any;
    options: any;
    teams: any[] = teams;
    ngOnInit(): void {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        this.data = {
            labels: ['Front End', 'BackEnd', 'Tester', 'Other'],
            datasets: [
                {
                    data: [4, 4, 4, 10],
                    backgroundColor: [
                        documentStyle.getPropertyValue('--blue-500'),
                        documentStyle.getPropertyValue('--yellow-500'),
                        documentStyle.getPropertyValue('--green-500'),
                        documentStyle.getPropertyValue('--gray-500'),
                    ],
                    hoverBackgroundColor: [
                        documentStyle.getPropertyValue('--blue-400'),
                        documentStyle.getPropertyValue('--yellow-400'),
                        documentStyle.getPropertyValue('--green-400'),
                        documentStyle.getPropertyValue('--gray-400'),
                    ],
                },
            ],
        };

        this.options = {
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: true,
                        color: textColor,
                    },
                },
            },
        };
    }
}
