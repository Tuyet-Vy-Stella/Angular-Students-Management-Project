import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
  {
    path: 'classrooms',
    loadChildren: () =>
      import('./classroom/feature/classroom-shell/classroom.module').then(
        (m) => m.ClassroomModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
