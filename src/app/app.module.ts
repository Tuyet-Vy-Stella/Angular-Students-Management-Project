import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'

import { StudentComponent } from './student/student.component'
import { StudentListComponent } from './student/student-list/student-list.component'
import { StudentEditComponent } from './student/student-edit/student-edit.component'

import { TeacherComponent } from './teacher/teacher.component'
import { TeacherListComponent } from './teacher/teacher-list/teacher-list.component'
import { TeacherEditComponent } from './teacher/teacher-edit/teacher-edit.component'

import { SubjectComponent } from './subject/subject.component'
import { SubjectListComponent } from './subject/subject-list/subject-list.component'
import { SubjectEditComponent } from './subject/subject-edit/subject-edit.component'

import { ClassComponent } from './class/class.component'
import { ClassListComponent } from './class/class-list/class-list.component'
import { ClassEditComponent } from './class/class-edit/class-edit.component'

import { AuthComponent } from './auth/auth.component'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

import { MenuIconComponent } from './shared/icons/menu-icon/menu-icon.component'
import { BellIconComponent } from './shared/icons/bell-icon/bell-icon.component'
import { ZoomIconComponent } from './shared/icons/zoom-icon/zoom-icon.component'
import { ChevronDownIconComponent } from './shared/icons/chevron-down-icon/chevron-down-icon.component'
import { ChevronRightComponent } from './shared/icons/chevron-right-icon/chevron-right-icon.component'
import { DashboardIconComponent } from './shared/icons/dashboard-icon/dashboard-icon.component'
import { UsersIconComponent } from './shared/icons/users-icon/users-icon.component'
import { ChalkboardIconComponent } from './shared/icons/chalkboard-icon/chalkboard-icon.component'
import { MathIconComponent } from './shared/icons/math-icon/math-icon.component'
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component'
import { FooterComponent } from './components/footer/footer.component';

import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,

    StudentComponent,
    StudentListComponent,
    StudentEditComponent,

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
    HomeComponent
  ],
  imports: [BrowserModule, AppRoutingModule, FontAwesomeModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
