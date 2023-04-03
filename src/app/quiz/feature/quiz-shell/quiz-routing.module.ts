import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { QuizResultComponent } from './../quiz-result/quiz-result.component';
import { QuizPageComponent } from './../quiz-page/quiz-page.component';
import { QuizAuthComponent } from '../quiz-auth/quiz-auth.component';
import { LoginGuard } from '../../data-access/login.guard';

const routes: Routes = [
  { path: '', component: QuizAuthComponent },
  { path: 'page', canActivate: [LoginGuard], component: QuizPageComponent  },
  { path: 'result', canActivate: [LoginGuard], component: QuizResultComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuizRoutingModule {}
