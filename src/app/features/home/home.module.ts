import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { ChartsComponent } from './components/charts/charts.component';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ChartModule } from 'primeng/chart';
import { TableModule } from 'primeng/table';
import { AuthGuard } from '@core/guards';

@NgModule({
    declarations: [HomeComponent, ChartsComponent],
    imports: [
        CommonModule,
        SharedModule,
        NgApexchartsModule,
        ChartModule,
        TableModule,
        RouterModule.forChild([
            { path: '', component: HomeComponent, canActivate: [AuthGuard] },
        ]),
    ],
})
export class HomeModule {}
