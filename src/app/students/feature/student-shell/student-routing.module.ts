import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StudentDetailComponent } from '../student-detail/student-detail.component';
import { CreatingStudentComponent } from '../creating-student/creating-student.component';
import { StudentListComponent } from '../student-list/student-list.component';

const routes: Routes = [
  { path: '', component: StudentListComponent },
  { path: 'create', component: CreatingStudentComponent },
  {
    path: ':id',
    children: [
      {
        path: '',
        component: StudentDetailComponent,
      },
      { path: 'update', component: CreatingStudentComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentRoutingModule {}
