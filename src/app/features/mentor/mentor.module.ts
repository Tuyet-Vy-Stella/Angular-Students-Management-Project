import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TeacherEditComponent, TeacherListComponent } from './pages';
import { SharedModule } from '@shared/shared.module';
import { TeacherRoutingModule } from './mentor-routing.module';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { MentorDetailComponent } from './pages/mentor-detail/mentor-detail.component';
import { SkeletonModule } from 'primeng/skeleton';
import { MentorFormComponent } from './components';

@NgModule({
    declarations: [
        TeacherEditComponent,
        TeacherListComponent,
        MentorDetailComponent,
        MentorFormComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        TeacherRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        InputTextModule,
        DropdownModule,
        ButtonModule,
        CalendarModule,
        SkeletonModule,
    ],
})
export class TeacherModule {}
