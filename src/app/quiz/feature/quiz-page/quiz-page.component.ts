import {
  Quiz,
  shuffle,
  QuizAnswer,
  Mark,
} from './../../data-access/quiz.model';
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
  totalAnswer: QuizAnswer[] = [];
  allAnswers!: string[];
  totalResult: any;
  subjectId!: number;
  studentId!: number;
  isReview = false;
  isSubmit = false;
  showReview = false;
  timer: number = 70;
  timerSeconds!: number;
  timerMinutes!: number;
  constructor(private quizService: QuizService, private route: Router) {}

  ngOnInit() {
    // check đã nộp bài chưa
    this.isReview = JSON.parse(localStorage.getItem('isSubmit') as string)
      ? JSON.parse(localStorage.getItem('isSubmit') as string)
      : false;

    // lấy ra những câu trả lời đã chọn
    this.quizService.chooseTotal$.subscribe(
      (answer) => (this.totalAnswer = answer)
    );

    this.subjectId = Number(localStorage.getItem('subject_id'));
    this.studentId = Number(localStorage.getItem('student_id'));

    // check đã làm bài chưa, nếu làm rồi thì lấy bài cũ
    if (localStorage.getItem('quizList')) {
      this.currentQuizList = JSON.parse(
        localStorage.getItem('quizList') as string
      );
      // check đã submit chưa, nếu rồi thì lấy đáp án
    } else if (localStorage.getItem('result')) {
      this.currentQuizList = JSON.parse(
        localStorage.getItem('result') as string
      );
    } else {
      // bốc ngẫu nhiên đủ 10 điểm
      this.quizService.getQuizList().subscribe((next: Quiz[]) => {
        this.quizList = shuffle(next);
        this.quizList.forEach((val) => {
          this.currentScore += val.score;
          val.allAnswers = shuffle([
            ...val.incorrect_answers,
            val.correct_answer,
          ]);
          if (this.currentScore <= 10) {
            if (val) {
              this.currentQuizList = [...this.currentQuizList, val];
            }
          } else {
            this.currentScore -= val.score;
          }
        });
        localStorage.setItem('quizList', JSON.stringify(this.currentQuizList));
      });
    }

    setInterval(() => {
      this.timer--;
      this.timerMinutes = Math.floor(this.timer / 60);
      this.timerSeconds = this.timer % 60;
      if (this.timer == 0) {
        // this.nextQuestion();
        this.totalResult = this.currentQuizList.map((quiz, index) => {
          let isCorrect = this.totalAnswer.some(
            (answer) => quiz.correct_answer === answer.answer
          );
          let score: any = isCorrect ? this.totalAnswer[index]?.score : 0;
          return {
            isCurrentChoose: { ...this.totalAnswer[index], score: score },
            isCorrect,
          };
        });
        this.currentQuizList = this.currentQuizList.map((quiz, index) => {
          return {
            ...quiz,
            result: this.totalResult[index],
          };
        });
        this.isReview = true;
        localStorage.setItem('result', JSON.stringify(this.currentQuizList));
        localStorage.setItem('isSubmit', JSON.stringify(this.isReview));
        localStorage.removeItem('quizList');
      }
    }, 1000);
  }
  handleSubmitQuiz() {
    // check đáp án đúng hay sai -> lấy ra đáp án vừa chọn và check đáp án đúng hay sai
    this.totalResult = this.currentQuizList.map((quiz, index) => {
      let isCorrect = this.totalAnswer.some(
        (answer) => quiz.correct_answer === answer.answer
      );
      let score: any = isCorrect ? this.totalAnswer[index]?.score : 0;
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
      // thêm phần kết quả sau khi làm bài vào trong mảng currentQuizList
      this.currentQuizList = this.currentQuizList.map((quiz, index) => {
        return {
          ...quiz,
          result: this.totalResult[index],
        };
      });
      this.isReview = true;
      localStorage.setItem('result', JSON.stringify(this.currentQuizList));
      localStorage.setItem('isSubmit', JSON.stringify(this.isReview));
      localStorage.removeItem('quizList');
    } else {
      alert('Please fill all the input!!');
      this.isSubmit = false;
      return;
    }
  }

  clearStorage() {
    let result: Mark = {
      student_id: this.studentId,
      subject_id: this.subjectId,
      mark: this.quizService.score,
      semester: 1,
    };

    // Post kết quả lên: Hạn chế sử dụng khi đang test để tránh rác database
    // this.quizService.postMark(this.studentId, result).subscribe(console.log)
    localStorage.clear();
    console.log('clear!!');
    this.route.navigate(['/home']);
  }
}
