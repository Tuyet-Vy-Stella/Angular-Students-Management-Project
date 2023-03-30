import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { LoadingSpinnerComponent } from './UI/loading-spinner/loading-spinner.component';
import { ModalComponent } from './UI/modal/modal.component';
import { SkeletonComponent } from './UI/skeleton/skeleton.component';
import { DropdownDirective } from './utils/dropdown.directive';

@NgModule({
  declarations: [
    LoadingSpinnerComponent,
    ModalComponent,
    SkeletonComponent,
    DropdownDirective,
  ],
  imports: [CommonModule, FontAwesomeModule],
  exports: [
    LoadingSpinnerComponent,
    ModalComponent,
    SkeletonComponent,
    DropdownDirective,
    CommonModule,
    FontAwesomeModule,
  ],
})
export class SharedModule {}
