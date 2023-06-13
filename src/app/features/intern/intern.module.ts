import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { StudentRoutingModule } from './intern-routing.module';
import { SharedModule } from '@shared/shared.module';

import { CreatingStudentComponent } from './components';
import { StudentDetailComponent, StudentListComponent} from './pages'

@NgModule({
    declarations: [
        StudentListComponent,
        CreatingStudentComponent,
        StudentDetailComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        StudentRoutingModule,
        ReactiveFormsModule,
        FontAwesomeModule,
    ],
})
export class StudentModule {}
