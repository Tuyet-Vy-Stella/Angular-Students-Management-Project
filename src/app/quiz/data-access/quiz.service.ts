import { Quiz, BACKEND_URL_QUIZ } from './quiz.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  constructor(private http: HttpClient) {}

  getQuizList() {
    return this.http.get<Quiz[]>(`${BACKEND_URL_QUIZ}/questions`);
  }

  getQuizById(id: number) {
    return this.http.get<Quiz>(`${BACKEND_URL_QUIZ}/questions/${id}`)
  }
}
