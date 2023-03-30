import { Quiz, shuffle, QuizAnswer } from './../../data-access/quiz.model';
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
  shufflerAnswer!: Quiz[];
  currentQuizList: Quiz[] = [];
  oldQuizList: Quiz[] = [];
  currentScore: number = 0;
  totalAnswer!: QuizAnswer[];
  totalResult: any;
  constructor(private quizService: QuizService, private route: Router) {}

  ngOnInit() {
    // lấy ra những câu trả lời đã chọn
    this.quizService.chooseTotal$.subscribe(
      (answer) => (this.totalAnswer = answer)
    );

    // check đã làm bài chưa, nếu làm rồi thì lấy bài cũ còn chưa thì làm bài mới
    if (localStorage.getItem('result')) {
      this.currentQuizList = JSON.parse(
        localStorage.getItem('result') as string
      );
    } else {
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
  }
  handleSubmitQuiz() {
    // check đáp án đúng hay sai -> lấy ra đáp án vừa chọn và check đáp án đúng hay sai
    this.totalResult = this.currentQuizList.map((quiz, index) => {
      let isCorrect = this.totalAnswer.some(
        (answer) => quiz.correct_answer === answer.answer
      );
      let score = isCorrect ? this.totalAnswer[index].score : 0;
      return {
        isCurrentChoose: { ...this.totalAnswer[index], score: score },
        isCorrect,
      };
    });
    // nếu làm bài xong sẽ lưu bài trên localStorage
    if (
      this.totalResult.length === this.currentQuizList.length &&
      this.totalResult.length === this.totalAnswer.length
    ) {
      this.currentQuizList = this.currentQuizList.map((quiz, index) => {
        return {
          ...quiz,
          result: this.totalResult[index],
        };
      });
      localStorage.setItem('result', JSON.stringify(this.currentQuizList));
      // thêm phần kết quả sau khi làm bài vào trong mảng currentQuizList
      this.route.navigate(['/quiz/result']);
    } else {
      alert('Please fill all the input!!');
    }
  }
}
