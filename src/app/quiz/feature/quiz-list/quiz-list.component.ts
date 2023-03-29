import { Component, Input, OnInit } from '@angular/core';
import { Quiz } from '../../data-access/quiz.model';
import { QuizService } from '../../data-access/quiz.service';

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss'],
})
export class QuizListComponent implements OnInit {
  @Input() quizList!: Quiz[];

  constructor(private quizService: QuizService) {}

  ngOnInit(): void {}
}
