import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { ChartsComponent } from './components/charts/charts.component';
import { AnnualLearningKindComponent } from './components/annual-learning-kind/annual-learning-kind.component';
import { StudentGenderChartComponent } from './components/intern-gender-chart/intern-gender-chart.component';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { NgApexchartsModule } from 'ng-apexcharts';

@NgModule({
    declarations: [
        HomeComponent,
        ChartsComponent,
        AnnualLearningKindComponent,
        StudentGenderChartComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        NgApexchartsModule,
        RouterModule.forChild([{ path: '', component: HomeComponent }]),
    ],
})
export class HomeModule {}
