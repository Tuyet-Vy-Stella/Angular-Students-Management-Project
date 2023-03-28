import { Quiz, shuffle } from './../../data-access/quiz.model';
import { QuizService } from './../../data-access/quiz.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-quiz-page',
  templateUrl: './quiz-page.component.html',
  styleUrls: ['./quiz-page.component.scss'],
})
export class QuizPageComponent {
  quizList!: Quiz[];
  shuffledAnswers!: string[];
  currentQuizList: Quiz[] = [
    {
      id: 0,
      score: 0,
      category: '',
      type: '',
      difficulty: '',
      question: '',
      correct_answer: '',
      incorrect_answers: ['', ''],
    },
  ];
  currentScore: number = 0;
  constructor(private quizService: QuizService) {}
  ngOnInit() {
    this.quizService.getQuizList().subscribe((next: Quiz[]) => {
      this.quizList = shuffle(next);
      this.shuffledAnswers = next.map((quiz) => {
        return shuffle([...quiz.incorrect_answers, quiz.correct_answer]);
      });
      this.quizList = next.map((quiz) => {
        if (quiz.difficulty === 'easy') {
          return { ...quiz, score: 0.5 };
        } else if (quiz.difficulty === 'medium') {
          return { ...quiz, score: 1 };
        } else {
          return { ...quiz, score: 2 };
        }
      });
      this.quizList.forEach((val) => {
        this.currentScore += val.score;
        if (this.currentScore <= 10) {
          if (val) {
            this.currentQuizList.push(val);
          }
        } else {
          this.currentScore -= val.score;
        }
      });
    });
  }
}
