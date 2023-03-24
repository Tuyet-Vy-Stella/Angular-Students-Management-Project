import { NgModule } from '@angular/core'
import { PreloadAllModules, RouterModule, Routes } from '@angular/router'

import { SubjectListComponent } from './subject/subject-list/subject-list.component'
import { SubjectEditComponent } from './subject/subject-edit/subject-edit.component'
import { TeacherListComponent } from './teacher/teacher-list/teacher-list.component'
import { TeacherEditComponent } from './teacher/teacher-edit/teacher-edit.component'
import { ClassListComponent } from './class/class-list/class-list.component'
import { SubjectComponent } from './subject/subject.component'
import { TeacherComponent } from './teacher/teacher.component'
import { ClassComponent } from './class/class.component'
import { AuthComponent } from './auth/auth.component'
import { LoginGuard } from './auth/login.guard'
import { ClassEditComponent } from './class/class-edit/class-edit.component'

const routes: Routes = [
  {
    path: 'students',
    loadChildren: () => import('./students/student.module').then((module) => module.StudentModule)
  },
  {
    path: 'subjects',
    component: SubjectComponent,
    children: [
      { path: '', component: SubjectListComponent },
      { path: 'new', component: SubjectEditComponent },
      { path: ':id', component: SubjectEditComponent },
      { path: ':id/edit', component: SubjectEditComponent }
    ]
  },
  {
    path: 'teachers',
    component: TeacherComponent,
    children: [
      { path: '', component: TeacherListComponent },
      { path: ':new', component: TeacherEditComponent },
      { path: ':id', component: TeacherEditComponent },
      { path: ':id/edit', component: TeacherEditComponent }
    ]
  },
  {
    path: 'classes',
    component: ClassComponent,
    children: [
      { path: '', component: ClassListComponent },
      { path: ':new', component: ClassEditComponent },
      { path: ':id', component: ClassEditComponent },
      { path: ':id/edit', component: ClassEditComponent }
    ]
  },
  { path: 'auth', canActivate: [LoginGuard], component: AuthComponent }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
