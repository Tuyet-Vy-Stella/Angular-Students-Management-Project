import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core'
import { PreloadAllModules, RouterModule, Routes } from '@angular/router'

import { SubjectListComponent } from './subject/subject-list/subject-list.component'
import { SubjectEditComponent } from './subject/subject-edit/subject-edit.component'
import { TeacherListComponent } from './teacher/teacher-list/teacher-list.component'
import { TeacherEditComponent } from './teacher/teacher-edit/teacher-edit.component'
import { ClassListComponent } from './class/class-list/class-list.component'
import { SubjectComponent } from './subject/subject.component'
// import { TeacherComponent } from './teacher/teacher.component'
import { ClassComponent } from './class/class.component'
import { AuthComponent } from './auth/auth.component'
import { LoginGuard } from './auth/login.guard'
import { ClassEditComponent } from './class/class-edit/class-edit.component'
import { HomeComponent } from './home/home.component'

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/feature/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./home/feature/home-shell/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'students',
    loadChildren: () =>
      import('./students/feature/student-shell/student.module').then(
        (module) => module.StudentModule
      ),
  },
  {
    path: 'subjects',
    loadChildren: () =>
      import('./subject/feature/subject-shell/subject.module').then(
        (m) => m.SubjectModule
      ),
  },
  {
    path: 'teachers',
    loadChildren: () =>
      import('./teacher/feature/teacher-shell/teacher.module').then(
        (m) => m.TeacherModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
