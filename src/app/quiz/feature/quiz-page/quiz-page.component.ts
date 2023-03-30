import { Quiz, shuffle, QuizAnswer, Mark } from './../../data-access/quiz.model';
import { QuizService } from './../../data-access/quiz.service';
import { Component} from '@angular/core';
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
  totalAnswer: QuizAnswer[] = []
  totalResult: any;
  subjectId!: number
  studentId!: number;

  isReview = false
  isSubmit = false
  showReview = false
  constructor(private quizService: QuizService, private route: Router) {}

  ngOnInit() {
    // lấy ra những câu trả lời đã chọn
    this.quizService.chooseTotal$.subscribe(
      (answer) => (this.totalAnswer = answer)
    );

    this.subjectId = Number(localStorage.getItem('subject_id'))
    this.studentId = Number(localStorage.getItem('student_id'))

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
      let score: any = isCorrect ? this.totalAnswer[index].score : 0;
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
      this.isReview = true
      // thêm phần kết quả sau khi làm bài vào trong mảng currentQuizList
    } else {
      alert('Please fill all the input!!');
      return
    }
  }


  clearStorage() {
    let result: Mark = {
      student_id: this.studentId,
      subject_id: this.subjectId,
      mark: this.quizService.score,
      semester: 1
    }

    // Post kết quả lên: Hạn chế sử dụng khi đang test để tránh rác database
    // this.quizService.postMark(this.studentId, result).subscribe(console.log)
    localStorage.clear()
    console.log("clear!!")
    this.route.navigate(['/home'])
  }
}
