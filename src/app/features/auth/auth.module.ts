import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoginGuard } from '@core/guards';

@NgModule({
    declarations: [AuthComponent],
    imports: [
        CommonModule,
        SharedModule,
        FormsModule,
        FontAwesomeModule,
        RouterModule.forChild([
            { path: '', canActivate: [LoginGuard], component: AuthComponent },
        ]),
    ],
})
export class AuthModule {}
