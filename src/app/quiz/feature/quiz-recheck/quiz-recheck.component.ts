import { Component, Input } from '@angular/core';
import { Quiz } from '../../data-access/quiz.model';

@Component({
  selector: 'app-quiz-recheck',
  templateUrl: './quiz-recheck.component.html',
  styleUrls: ['./quiz-recheck.component.scss']
})
export class QuizRecheckComponent {
  @Input() quizList!: Quiz[];
}
