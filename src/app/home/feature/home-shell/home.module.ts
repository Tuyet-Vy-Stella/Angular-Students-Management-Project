import { NgModule } from '@angular/core';
import { HomeComponent } from '../home-detail/home.component';
import { ChartsComponent } from '../../ui/charts/charts.component';
import { AnnualLearningKindComponent } from '../annual-learning-kind/annual-learning-kind.component';
import { StudentGenderChartComponent } from '../student-gender-chart/student-gender-chart.component';
import { SharedModule } from '../../../shared/shared.module';
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
    SharedModule,
    NgApexchartsModule,
    RouterModule.forChild([{ path: '', component: HomeComponent }]),
  ],
})
export class HomeModule {}
