import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CookieService } from 'ngx-cookie-service';

// Module
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { AuthInterceptor } from './auth/data-access/auth.interceptor';

// Common
import { HeaderComponent } from './layouts/ui/header/header.component';
import { SidebarComponent } from './layouts/ui/sidebar/sidebar.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, SidebarComponent],

  imports: [
    FontAwesomeModule,
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 4000,
      positionClass: 'toast-top-right',
      preventDuplicates: false,
      easing: 'ease-in-out',
    }),
  ],
  providers: [
    [CookieService],
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
