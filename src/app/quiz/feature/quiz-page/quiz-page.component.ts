import { FinalResult, Quiz, shuffle } from './../../data-access/quiz.model';
import { QuizService } from './../../data-access/quiz.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz-page',
  templateUrl: './quiz-page.component.html',
  styleUrls: ['./quiz-page.component.scss'],
})
export class QuizPageComponent {
  quizList!: Quiz[];
  currentQuizList: Quiz[] = [];
  finalQuizList: Quiz[] = []
  finalResult: FinalResult = {
    finalScore: 0,
    quizSelect: []
  }
  isSubmit = false;
  showScore = false;

  constructor(private quizService: QuizService, private route: Router) {}

  ngOnInit() {
    let remainScore: number = 0;
    this.quizService.getQuizList().subscribe((next: Quiz[]) => {
      this.quizList = shuffle(next);
      this.quizList.map((val) => {
        return (val.answersSelect = shuffle([
          ...val.incorrect_answers,
          val.correct_answer,
        ]));
      });
      this.quizList.forEach((val) => {
        remainScore += val.score;
        if (remainScore <= 10) {
          if (val) {
            this.currentQuizList = [...this.currentQuizList, val];
          }
        } else {
          remainScore -= val.score;
        }
      });
    });
  }

  handleFinalScore(event: any) {
    this.isSubmit = true;
    this.finalResult = event;
    console.log(event);
  }

  handleFinalSubmit() {
    this.showScore = true;
  }

  handleBack() {
    this.isSubmit = false;
    this.showScore = false;
  }
}
