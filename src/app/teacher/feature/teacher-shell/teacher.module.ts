import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TeacherEditComponent } from '../teacher-edit/teacher-edit.component';
import { TeacherListComponent } from '../teacher-list/teacher-list.component';
import { SharedModule } from '../../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TeacherRoutingModule } from './teacher-routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [TeacherEditComponent, TeacherListComponent],
  imports: [
    CommonModule,
    SharedModule,
    TeacherRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class TeacherModule {}
