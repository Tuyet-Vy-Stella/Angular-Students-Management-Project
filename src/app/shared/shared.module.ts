import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

import { LoadingSpinnerComponent } from './UI/loading-spinner/loading-spinner.component'
import { ModalComponent } from './UI/modal/modal.component'
import { SkeletonComponent } from './UI/skeleton/skeleton.component'
import { PascalCasePipe } from './pipes/pascalcase.pipe'

@NgModule({
  declarations: [LoadingSpinnerComponent, ModalComponent, SkeletonComponent, PascalCasePipe],
  imports: [CommonModule, FontAwesomeModule],
  exports: [LoadingSpinnerComponent, ModalComponent, SkeletonComponent, CommonModule, FontAwesomeModule],
  exports: [LoadingSpinnerComponent, ModalComponent, SkeletonComponent, PascalcasePipe]
})
export class SharedModule {}
