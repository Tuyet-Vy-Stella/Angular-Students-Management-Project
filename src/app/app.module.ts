import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StudentEditComponent } from './student/student-edit/student-edit.component';
import { TeacherEditComponent } from './teacher/teacher-edit/teacher-edit.component';
import { SubjectListComponent } from './subject/subject-list/subject-list.component';
import { SubjectEditComponent } from './subject/subject-edit/subject-edit.component';
import { StudentListComponent } from './student/student-list/student-list.component';
import { TeacherListComponent } from './teacher/teacher-list/teacher-list.component';
import { ClassListComponent } from './class/class-list/class-list.component';
import { ClassEditComponent } from './class/class-edit/class-edit.component';
import { StudentComponent } from './student/student.component';
import { SubjectComponent } from './subject/subject.component';
import { TeacherComponent } from './teacher/teacher.component';
import { ClassComponent } from './class/class.component';
import { AuthComponent } from './auth/auth.component';

@NgModule({
  declarations: [
    AppComponent,
    StudentEditComponent,
    TeacherEditComponent,
    SubjectListComponent,
    SubjectEditComponent,
    StudentListComponent,
    TeacherListComponent,
    ClassListComponent,
    ClassEditComponent,
    StudentComponent,
    SubjectComponent,
    TeacherComponent,
    ClassComponent,
    AuthComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
