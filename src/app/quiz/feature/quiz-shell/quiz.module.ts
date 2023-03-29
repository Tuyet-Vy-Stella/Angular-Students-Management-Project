import { QuizRecheckComponent } from './../quiz-recheck/quiz-recheck.component';
import { QuizResultComponent } from './../quiz-result/quiz-result.component';
import { QuizListComponent } from './../quiz-list/quiz-list.component';
import { QuizAuthComponent } from './../quiz-auth/quiz-auth.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { QuizRoutingModule } from './quiz-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { QuizPageComponent } from '../quiz-page/quiz-page.component';
import { QuizItemComponent } from '../quiz-item/quiz-item.component';

@NgModule({
  declarations: [
    QuizPageComponent,
    QuizAuthComponent,
    QuizListComponent,
    QuizResultComponent,
    QuizRecheckComponent,
    QuizItemComponent,
  ],
  imports: [FormsModule, SharedModule, QuizRoutingModule, ReactiveFormsModule],
})
export class QuizModule {}
