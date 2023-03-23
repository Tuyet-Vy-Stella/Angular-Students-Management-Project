import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component'
import { ModalComponent } from './modal/modal.component'
import { SkeletonComponent } from './skeleton/skeleton.component'

@NgModule({
  declarations: [LoadingSpinnerComponent, ModalComponent, SkeletonComponent],
  imports: [CommonModule, FontAwesomeModule],
  exports: [LoadingSpinnerComponent, ModalComponent, SkeletonComponent]
})
export class SharedModule {}
