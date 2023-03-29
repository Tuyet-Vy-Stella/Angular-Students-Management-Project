import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubjectListComponent } from '../subject-list/subject-list.component';
import { SubjectEditComponent } from '../subject-edit/subject-edit.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: SubjectListComponent },
      { path: 'new', component: SubjectEditComponent },
      { path: ':id', component: SubjectEditComponent },
      { path: ':id/edit', component: SubjectEditComponent },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubjectRoutingModule {}
