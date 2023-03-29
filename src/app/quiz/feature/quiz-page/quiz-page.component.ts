import { Quiz, shuffle } from './../../data-access/quiz.model';
import { QuizService } from './../../data-access/quiz.service';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz-page',
  templateUrl: './quiz-page.component.html',
  styleUrls: ['./quiz-page.component.scss'],
})
export class QuizPageComponent {

  quizList!: Quiz[];
  currentQuizList: Quiz[] = [];
  currentScore: number = 0;
  constructor(private quizService: QuizService, private route: Router) {}
  ngOnInit() {
    this.quizService.getQuizList().subscribe((next: Quiz[]) => {
      this.quizList = shuffle(next);
      this.quizList.forEach((val) => {
        this.currentScore += val.score;
        if (this.currentScore <= 10) {
          if (val) {
            this.currentQuizList = [...this.currentQuizList, val];
          }
        } else {
          this.currentScore -= val.score;
        }
      });
    });
  }

  handleSubmitQuiz() {
    console.log("submitted")
    this.route.navigate(['/quiz/recheck'])
  }
}
