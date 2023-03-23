import { AuthInterceptorService } from './auth/auth-interceptor.service'
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from "@angular/forms";
import {HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthInterceptor} from "./auth/auth.interceptor";
import { ReactiveFormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ToastrModule } from 'ngx-toastr'
import { NgApexchartsModule } from 'ng-apexcharts';

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'

// Students
import { StudentListComponent } from './students/student-list/student-list.component'
import { StudentDetailComponent } from './students/student-detail/student-detail.component'
import { CreatingStudentComponent } from './students/creating-student/creating-student.component'

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
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

import {MenuIconComponent} from './shared/icons/menu-icon/menu-icon.component'
import {BellIconComponent} from './shared/icons/bell-icon/bell-icon.component'
import {ZoomIconComponent} from './shared/icons/zoom-icon/zoom-icon.component'
import {ChevronDownIconComponent} from './shared/icons/chevron-down-icon/chevron-down-icon.component'
import {ChevronRightComponent} from './shared/icons/chevron-right-icon/chevron-right-icon.component'
import {DashboardIconComponent} from './shared/icons/dashboard-icon/dashboard-icon.component'
import {UsersIconComponent} from './shared/icons/users-icon/users-icon.component'
import {ChalkboardIconComponent} from './shared/icons/chalkboard-icon/chalkboard-icon.component'
import {MathIconComponent} from './shared/icons/math-icon/math-icon.component'
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component'
import { FooterComponent } from './components/footer/footer.component';

import { HomeComponent } from './home/home.component';
import { ChartsComponent } from './charts/charts.component';
import { AnnualLearningKindComponent } from './charts/annual-learning-kind/annual-learning-kind.component';
import { StudentGenderChartComponent } from './charts/student-gender-chart/student-gender-chart.component';
import {CookieService} from "ngx-cookie-service";;
import { SkeletonComponent } from './skeleton/skeleton.component'

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,

    StudentListComponent,
    StudentDetailComponent,
    CreatingStudentComponent,

    TeacherComponent,
    TeacherListComponent,
    TeacherEditComponent,

    SubjectComponent,
    SubjectListComponent,
    SubjectEditComponent,

    ClassComponent,
    ClassListComponent,
    ClassEditComponent,

    MenuIconComponent,
    BellIconComponent,
    ZoomIconComponent,
    ChevronDownIconComponent,
    ChevronRightComponent,
    DashboardIconComponent,
    UsersIconComponent,
    ChalkboardIconComponent,
    MathIconComponent,
    HomeComponent,
    ChartsComponent,
    AnnualLearningKindComponent,
    StudentGenderChartComponent,

    SkeletonComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
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
  providers: [[CookieService], {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
