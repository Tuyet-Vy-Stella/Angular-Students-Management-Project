import { Router } from '@angular/router';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Quiz } from '../../data-access/quiz.model';
import { QuizService } from '../../data-access/quiz.service';

@Component({
  selector: 'app-quiz-result',
  templateUrl: './quiz-result.component.html',
  styleUrls: ['./quiz-result.component.scss'],
})
export class QuizResultComponent implements OnInit {
  @Input() quizList!: Quiz[];
  @Output('getScore') score = new EventEmitter<number>();
  finalResult!: Quiz[];
  numberQuiz!: number;
  numberCorrect!: number;
  finalScore!: number;

  constructor(private route: Router, private quizService: QuizService) {}

  ngOnInit(): void {
    this.finalResult = JSON.parse(localStorage.getItem('result') as string);
    this.numberQuiz = this.finalResult.length;
    this.numberCorrect = this.finalResult.reduce((acc, val) => {
      let temp = 0;
      if (val?.result?.isCorrect) {
        temp++;
      }
      return acc + temp;
    }, 0);

    this.finalScore = this.finalResult.reduce((acc, val) => {
      return acc + (val.result?.isCurrentChoose?.score || 0);
    }, 0);

    this.quizService.score = this.finalScore;
  }
}
