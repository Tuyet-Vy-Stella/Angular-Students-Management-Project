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
import { Observable, toArray } from 'rxjs';
import { Quiz, shuffle } from '../../data-access/quiz.model';
import { QuizService } from '../../data-access/quiz.service';

@Component({
  selector: 'app-quiz-item',
  templateUrl: './quiz-item.component.html',
  styleUrls: ['./quiz-item.component.scss'],
})
export class QuizItemComponent implements OnInit, OnDestroy {
  @Input() id!: number;
  @Output() answer = new EventEmitter<boolean>();
  @ViewChildren('input') inputs!: QueryList<ElementRef>;
  shufflerAnswer!: string[];

  quiz$!: Observable<Quiz>;

  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    this.quiz$ = this.quizService.getQuizById(this.id);

    this.quiz$.subscribe((quiz) => {
      this.shufflerAnswer = shuffle([
        ...quiz.incorrect_answers,
        quiz.correct_answer,
      ]);
    });
  }

  ngOnDestroy(): void {
    // this.inputs.changes.subscribe(() => {
    //   this.inputs.toArray().forEach(val => {
    //     // this.answer.emit(val.nativeElement.checked)
    //     console.log(val)
    //   })
    // });

    console.log(this.inputs)
  }
}
