import { RouterModule, Routes } from '@angular/router';
import { TeacherListComponent } from '../teacher-list/teacher-list.component';
import { TeacherEditComponent } from '../teacher-edit/teacher-edit.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: TeacherListComponent },
      { path: ':new', component: TeacherEditComponent },
      { path: ':id', component: TeacherEditComponent },
      { path: ':id/edit', component: TeacherEditComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeacherRoutingModule {}
