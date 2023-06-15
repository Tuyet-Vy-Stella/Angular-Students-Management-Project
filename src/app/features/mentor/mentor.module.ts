import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TeacherListComponent, MentorDetailComponent } from './pages';
import { SharedModule } from '@shared/shared.module';
import { TeacherRoutingModule } from './mentor-routing.module';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { SkeletonModule } from 'primeng/skeleton';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@NgModule({
    declarations: [TeacherListComponent, MentorDetailComponent],
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
        ConfirmDialogModule,
    ],
})
export class TeacherModule {}
