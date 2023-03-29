import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-quiz-result',
  templateUrl: './quiz-result.component.html',
  styleUrls: ['./quiz-result.component.scss'],
})
export class QuizResultComponent {
  constructor(private route: Router) {}
  returnQuiz() {
    this.route.navigate(['/quiz']);
  }
}
