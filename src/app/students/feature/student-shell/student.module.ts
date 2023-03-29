import { CommonModule } from '@angular/common'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { ReactiveFormsModule } from '@angular/forms'
import { NgModule } from '@angular/core'

import { StudentRoutingModule } from './student-routing.module'
import { SharedModule } from '../../../shared/shared.module'

import { StudentDetailComponent } from '../student-detail/student-detail.component'
import { CreatingStudentComponent } from '../creating-student/creating-student.component'
import { StudentListComponent } from '../student-list/student-list.component'

@NgModule({
  declarations: [StudentListComponent, CreatingStudentComponent, StudentDetailComponent],
  imports: [CommonModule, SharedModule, StudentRoutingModule, ReactiveFormsModule, FontAwesomeModule]
})
export class StudentModule {}
