import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TeacherEditComponent } from '../teacher-edit/teacher-edit.component';
import { TeacherListComponent } from '../teacher-list/teacher-list.component';
import { SharedModule } from '../../../shared/shared.module';
import { TeacherRoutingModule } from './teacher-routing.module';

@NgModule({
  declarations: [TeacherEditComponent, TeacherListComponent],
  imports: [SharedModule, TeacherRoutingModule, ReactiveFormsModule],
})
export class TeacherModule {}
