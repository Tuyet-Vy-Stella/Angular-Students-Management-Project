import { QuizAnswer } from './../../data-access/quiz.model';
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
import { Observable, toArray, map } from 'rxjs';
import { Quiz, shuffle } from '../../data-access/quiz.model';
import { QuizService } from '../../data-access/quiz.service';

@Component({
  selector: 'app-quiz-item',
  templateUrl: './quiz-item.component.html',
  styleUrls: ['./quiz-item.component.scss'],
})
export class QuizItemComponent implements OnInit, OnDestroy {
  @Input() quiz!: Quiz;
  // @Output() answer = new EventEmitter<boolean>();
  @ViewChildren('input') inputs!: QueryList<ElementRef>;
  shufflerAnswer!: string[];
  // quiz$!: Observable<Quiz>;

  // đưa đáp án chọn vào subject
  onChoose(data: QuizAnswer) {
    this.quizService.addAnswer(data);
  }
  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    this.shufflerAnswer = shuffle([
      ...this.quiz.incorrect_answers,
      this.quiz.correct_answer,
    ]);
  }

  ngOnDestroy(): void {
    // this.inputs.changes.subscribe(() => {
    //   this.inputs.toArray().forEach(val => {
    //     // this.answer.emit(val.nativeElement.checked)
    //     console.log(val)
    //   })
    // });
    // console.log(this.inputs);
  }
}
