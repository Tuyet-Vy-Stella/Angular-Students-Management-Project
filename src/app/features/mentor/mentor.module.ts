import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TeacherEditComponent, TeacherListComponent } from './pages';
import { SharedModule } from '@shared/shared.module';
import { TeacherRoutingModule } from './mentor-routing.module';
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
