import { Observable, Subject } from 'rxjs';
import {
  Quiz,
  BACKEND_URL_QUIZ,
  QuizAnswer,
  Mark,
  markAPI,
} from './quiz.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  constructor(private http: HttpClient) {}

  // khai báo subject mới để lưu những kết quả vừa chọn
  chooseTotal$ = new Subject<QuizAnswer[]>();
  chooseTotal: QuizAnswer[] = [];
  score!: number;

  addAnswer(data: QuizAnswer) {
    // lọc 1 câu chỉ được chọn 1 đáp án
    const indexCurrentChoose = this.chooseTotal.findIndex(
      (item) => item.quizID === data.quizID
    );
    const currentChoose = this.chooseTotal[indexCurrentChoose];
    if (this.chooseTotal.includes(currentChoose)) {
      this.chooseTotal.splice(indexCurrentChoose, 1);
    }
    // thêm câu trả lời vào subject
    this.chooseTotal.push(data);
    this.chooseTotal$.next([...this.chooseTotal]);
  }

  getQuizList() {
    return this.http.get<Quiz[]>(`${BACKEND_URL_QUIZ}/questions`);
  }

  getQuizById(id: number) {
    return this.http.get<Quiz>(`${BACKEND_URL_QUIZ}/questions/${id}`);
  }

  postMark(id: number, data: Mark): Observable<any> {
    return this.http.post<Mark>(markAPI, data, {
      params: {
        student_id: id,
      },
    });
  }
}
