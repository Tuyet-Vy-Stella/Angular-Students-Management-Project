import { NgModule } from '@angular/core';
import { SubjectEditComponent } from '../subject-edit/subject-edit.component';
import { SubjectListComponent } from '../subject-list/subject-list.component';
import { SubjectRoutingModule } from './subject-routing.module';
import { SharedModule } from '../../../shared/shared.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [SubjectEditComponent, SubjectListComponent],
  imports: [SubjectRoutingModule, SharedModule, FormsModule],
})
export class SubjectModule {}
