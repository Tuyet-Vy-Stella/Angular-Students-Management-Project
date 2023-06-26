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
import { TableModule } from 'primeng/table';
import { RouterModule } from '@angular/router';
import { MentorFormComponent, MentorInfoComponent } from './components';
import { PaginatorModule } from 'primeng/paginator';
import { TabMenuModule } from 'primeng/tabmenu';
import { DialogModule } from 'primeng/dialog';

@NgModule({
    declarations: [
        TeacherListComponent,
        MentorDetailComponent,
        MentorFormComponent,
        MentorInfoComponent,
    ],
    imports: [
        TableModule,
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
        RouterModule,
        PaginatorModule,
        TabMenuModule,
        DialogModule
    ],
})
export class TeacherModule {}
