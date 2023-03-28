import { SharedModule } from './../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { QuizRoutingModule } from './quiz-routing.module';

@NgModule({
  declarations: [],
  imports: [SharedModule, QuizRoutingModule, ReactiveFormsModule],
})
export class QuizModule {}
