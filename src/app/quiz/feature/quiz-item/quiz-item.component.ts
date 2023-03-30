import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChildren,
  QueryList,
  ElementRef,
  OnDestroy,
} from '@angular/core';
import { Observable } from 'rxjs';
import { Quiz, shuffle } from '../../data-access/quiz.model';
import { QuizService } from '../../data-access/quiz.service';

@Component({
  selector: 'app-quiz-item',
  templateUrl: './quiz-item.component.html',
  styleUrls: ['./quiz-item.component.scss'],
})
export class QuizItemComponent implements OnInit, OnDestroy {
  @Input() id!: number;
  @Output('selectChange') change = new EventEmitter<{}>();
  @ViewChildren('input') inputs!: QueryList<ElementRef>;

  quiz$!: Observable<Quiz>
  shufflerAnswers: string[] = []

  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    this.quiz$ = this.quizService.getQuizById(this.id)

    this.quiz$.subscribe((quiz) => {
      this.shufflerAnswers = shuffle([
        ...quiz.incorrect_answers,
        quiz.correct_answer,
      ]);
    });
  }

  ngOnDestroy(): void {

  }

  emitChangeValue(event: number) {
    console.log(event)
    let quiz
    this.quiz$.subscribe((val) => {
      quiz = val.correct_answer

      if (this.shufflerAnswers[event] === quiz) {
        this.change.emit({isCorrect: true, selectIndex: event})
      } else {
        this.change.emit({isCorrect: false, selectIndex: event})
      }
    })
  }
}
