import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {StudentListComponent} from "./student/student-list/student-list.component";
import {StudentEditComponent} from "./student/student-edit/student-edit.component";
import {SubjectListComponent} from "./subject/subject-list/subject-list.component";
import {SubjectEditComponent} from "./subject/subject-edit/subject-edit.component";
import {TeacherListComponent} from "./teacher/teacher-list/teacher-list.component";
import {TeacherEditComponent} from "./teacher/teacher-edit/teacher-edit.component";
import {ClassListComponent} from "./class/class-list/class-list.component";
import {ClassEditComponent} from "./class/class-edit/class-edit.component";
import {StudentComponent} from "./student/student.component";
import {SubjectComponent} from "./subject/subject.component";
import {TeacherComponent} from "./teacher/teacher.component";
import {ClassComponent} from "./class/class.component";
import {AuthComponent} from "./auth/auth.component";

const routes: Routes = [
  {path: '', redirectTo: '/students', pathMatch: 'full'},
  {
    path: 'students', component: StudentComponent, children: [
      {path: '', component: StudentListComponent},
      {path: 'new', component: StudentEditComponent},
      {path: ':id', component: StudentEditComponent},
      {path: ':id/edit', component: StudentEditComponent}
    ]
  },
  {
    path: 'subjects', component: SubjectComponent, children: [
      {path: '', component: SubjectListComponent},
      {path: 'new', component: SubjectEditComponent},
      {path: ':id', component: SubjectEditComponent},
      {path: ':id/edit', component: SubjectEditComponent}
    ]
  },
  {
    path: 'teachers', component: TeacherComponent, children: [
      {path: '', component: TeacherListComponent},
      {path: ':new', component: TeacherEditComponent},
      {path: ':id', component: TeacherEditComponent},
      {path: ':id/edit', component: TeacherEditComponent}
    ]
  },
  {
    path: 'classes', component: ClassComponent, children: [
      {path: '', component: ClassListComponent},
      {path: ':new', component: ClassEditComponent},
      {path: ':id', component: ClassEditComponent},
      {path: ':id/edit', component: ClassEditComponent}
    ]
  },
  {path: 'auth', component: AuthComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
