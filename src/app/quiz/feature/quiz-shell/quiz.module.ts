import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { QuizRoutingModule } from './quiz-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [],
  imports: [SharedModule, QuizRoutingModule, ReactiveFormsModule],
})
export class QuizModule {}
