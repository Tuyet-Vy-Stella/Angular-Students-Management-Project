import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';


import { QuizRecheckComponent } from './../quiz-recheck/quiz-recheck.component';
import { QuizResultComponent } from './../quiz-result/quiz-result.component';
import { QuizPageComponent } from './../quiz-page/quiz-page.component';
import { QuizAuthComponent } from '../quiz-auth/quiz-auth.component';
import { QuizListComponent } from '../quiz-list/quiz-list.component';

const routes: Routes = [
  { path: '', component: QuizPageComponent },
  { path: 'quiz-list', component: QuizListComponent },
  { path: 'auth', component: QuizAuthComponent },
  { path: 'result', component: QuizResultComponent },
  { path: 'recheck', component: QuizRecheckComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuizRoutingModule {}
