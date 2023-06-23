import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CookieService } from 'ngx-cookie-service';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { AuthInterceptor } from '@core/interceptors/auth.interceptor';

import { CoreModule } from '@core/core.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import en from '@angular/common/locales/en';

registerLocaleData(en);

@NgModule({
    declarations: [AppComponent],

    imports: [
        FontAwesomeModule,
        AppRoutingModule,
        BrowserModule,
        HttpClientModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        ToastrModule.forRoot({
            timeOut: 4000,
            positionClass: 'toast-top-center',
            preventDuplicates: false,
            easing: 'ease-in-out',
            toastClass: 'custom-toastr ngx-toastr',
        }),
        FormsModule,
        CoreModule,
    ],
    providers: [
        [CookieService, JwtHelperService],
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
        },
        {
            provide: JWT_OPTIONS,
            useValue: JWT_OPTIONS,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
