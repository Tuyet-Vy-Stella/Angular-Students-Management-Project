import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ToastrModule } from 'ngx-toastr'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { CookieService } from 'ngx-cookie-service'

// Module
import { AppRoutingModule } from './app-routing.module'
import { SharedModule } from './shared/shared.module'

import { AppComponent } from './app.component'

import { AuthInterceptor } from './auth/auth.interceptor'

// Teachers
import { TeacherEditComponent } from './teacher/teacher-edit/teacher-edit.component'
import { TeacherListComponent } from './teacher/teacher-list/teacher-list.component'
import { TeacherComponent } from './teacher/teacher.component'

// Subjects
import { SubjectListComponent } from './subject/subject-list/subject-list.component'
import { SubjectEditComponent } from './subject/subject-edit/subject-edit.component'
import { SubjectComponent } from './subject/subject.component'

// Class
import { ClassListComponent } from './class/class-list/class-list.component'
import { ClassEditComponent } from './class/class-edit/class-edit.component'
import { ClassComponent } from './class/class.component'

// Auth
import { AuthComponent } from './auth/auth.component'

// Common
import { HeaderComponent } from './components/header/header.component'
import { SidebarComponent } from './components/sidebar/sidebar.component'
import { NgApexchartsModule } from 'ng-apexcharts'
@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HeaderComponent,
    SidebarComponent
  ],

  imports: [
    FontAwesomeModule,
    AppRoutingModule,
    SharedModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgApexchartsModule,
    ToastrModule.forRoot({
      timeOut: 4000,
      positionClass: 'toast-top-right',
      preventDuplicates: false,
      easing: 'ease-in-out'
    })
  ],
  providers: [
    [CookieService],
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
