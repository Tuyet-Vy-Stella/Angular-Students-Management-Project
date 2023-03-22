import { AuthInterceptorService } from './auth/auth-interceptor.service'
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ToastrModule } from 'ngx-toastr'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'

import { AuthInterceptor } from './auth/auth.interceptor'

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

// Dashboard

// Class
import { ClassListComponent } from './class/class-list/class-list.component'
import { ClassEditComponent } from './class/class-edit/class-edit.component'
import { ClassComponent } from './class/class.component'

// Auth
import { AuthComponent } from './auth/auth.component'

// Common
import { HeaderComponent } from './header/header.component'
import { SidebarComponent } from './sidebar/sidebar.component'
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component'
import { ModalComponent } from './shared/modal/modal.component'
import { SkeletonComponent } from './shared/skeleton/skeleton.component'

@NgModule({
  declarations: [
    AppComponent,
    TeacherEditComponent,
    SubjectListComponent,
    SubjectEditComponent,
    TeacherListComponent,
    ClassListComponent,
    ClassEditComponent,
    SubjectComponent,
    TeacherComponent,
    ClassComponent,
    AuthComponent,
    HeaderComponent,
    SidebarComponent,
    StudentListComponent,
    StudentDetailComponent,
    CreatingStudentComponent,
    SkeletonComponent,
    ModalComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
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
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
