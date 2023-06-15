import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SubjectListComponent } from './pages';
import { SubjectRoutingModule } from './technology-routing.module';
import { SharedModule } from '@shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TechnologyCreateComponent } from './components';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@NgModule({
    declarations: [SubjectListComponent, TechnologyCreateComponent],
    imports: [
        CommonModule,
        SubjectRoutingModule,
        SharedModule,
        ReactiveFormsModule,
        ButtonModule,
        InputTextModule,
        ConfirmDialogModule
    ],
})
export class SubjectModule {}
