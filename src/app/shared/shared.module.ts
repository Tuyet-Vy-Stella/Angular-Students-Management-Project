import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

import { LoadingSpinnerComponent } from './UI/loading-spinner/loading-spinner.component'
import { ModalComponent } from './UI/modal/modal.component'
import { SkeletonComponent } from './UI/skeleton/skeleton.component'
import { PascalCasePipe } from './pipes/pascalcase.pipe'
import { SkeletonOptimizeComponent } from './UI/skeleton-optimize/skeleton-optimize.component';

@NgModule({
  declarations: [LoadingSpinnerComponent, ModalComponent, SkeletonComponent, PascalCasePipe, SkeletonOptimizeComponent],
  imports: [CommonModule, FontAwesomeModule],
  exports: [
    SkeletonOptimizeComponent,
    LoadingSpinnerComponent,
    ModalComponent,
    SkeletonComponent,
    CommonModule,
    FontAwesomeModule,
    PascalCasePipe
  ],
})
export class SharedModule {}
