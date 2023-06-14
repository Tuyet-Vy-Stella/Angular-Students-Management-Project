import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import {
    LoadingSpinnerComponent,
    ModalComponent,
    SkeletonComponent,
    SkeletonOptimizeComponent,
    TabMenuComponent,
} from './components';

import { ListDataComponent } from './layouts';

import { DropdownDirective } from './directives';
import { PascalCasePipe } from './pipes';
import { SkeletonModule } from 'primeng/skeleton';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { PaginatorModule } from 'primeng/paginator';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [
        LoadingSpinnerComponent,
        ModalComponent,
        SkeletonComponent,
        PascalCasePipe,
        SkeletonOptimizeComponent,
        DropdownDirective,
        ListDataComponent,
        TabMenuComponent,
    ],
    imports: [
        CommonModule,
        FontAwesomeModule,
        SkeletonModule,
        ButtonModule,
        TableModule,
        InputTextModule,
        DropdownModule,
        PaginatorModule,
        ConfirmDialogModule,
        RouterModule,
    ],
    exports: [
        CommonModule,
        SkeletonOptimizeComponent,
        LoadingSpinnerComponent,
        ModalComponent,
        SkeletonComponent,
        DropdownDirective,
        FontAwesomeModule,
        PascalCasePipe,
        ListDataComponent,
        TabMenuComponent,
    ],
})
export class SharedModule {}
