import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { ReactiveFormsModule } from '@angular/forms'

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

// Dashboard

// Class
import { ClassListComponent } from './class/class-list/class-list.component'
import { ClassEditComponent } from './class/class-edit/class-edit.component'
import { ClassComponent } from './class/class.component'

// Auth
import { AuthComponent } from './auth/auth.component'

// Common
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { HeaderComponent } from './header/header.component'
import { SidebarComponent } from './sidebar/sidebar.component'

import { MenuIconComponent } from './shared/icons/menu-icon/menu-icon.component'
import { BellIconComponent } from './shared/icons/bell-icon/bell-icon.component'
import { ZoomIconComponent } from './shared/icons/zoom-icon/zoom-icon.component'
import { ChevronDownIconComponent } from './shared/icons/chevron-down-icon/chevron-down-icon.component'
import { ChevronRightComponent } from './shared/icons/chevron-right-icon/chevron-right-icon.component'
import { DashboardIconComponent } from './shared/icons/dashboard-icon/dashboard-icon.component'
import { UsersIconComponent } from './shared/icons/users-icon/users-icon.component'
import { ChalkboardIconComponent } from './shared/icons/chalkboard-icon/chalkboard-icon.component'
import { MathIconComponent } from './shared/icons/math-icon/math-icon.component'

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
    MenuIconComponent,
    BellIconComponent,
    ZoomIconComponent,
    ChevronDownIconComponent,
    ChevronRightComponent,
    DashboardIconComponent,
    UsersIconComponent,
    ChalkboardIconComponent,
    MathIconComponent,
    StudentListComponent,
    StudentDetailComponent,
    CreatingStudentComponent
  ],
  imports: [BrowserModule, AppRoutingModule, FontAwesomeModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
