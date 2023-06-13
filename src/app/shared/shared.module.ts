import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import {
    LoadingSpinnerComponent,
    ModalComponent,
    SkeletonComponent,
    SkeletonOptimizeComponent,
} from './components';
import { DropdownDirective } from './directives';
import { PascalCasePipe } from './pipes';

@NgModule({
    declarations: [
        LoadingSpinnerComponent,
        ModalComponent,
        SkeletonComponent,
        PascalCasePipe,
        SkeletonOptimizeComponent,
        DropdownDirective,
    ],
    imports: [CommonModule, FontAwesomeModule],
    exports: [
        SkeletonOptimizeComponent,
        LoadingSpinnerComponent,
        ModalComponent,
        SkeletonComponent,
        DropdownDirective,
        CommonModule,
        FontAwesomeModule,
        PascalCasePipe,
    ],
})
export class SharedModule {}
