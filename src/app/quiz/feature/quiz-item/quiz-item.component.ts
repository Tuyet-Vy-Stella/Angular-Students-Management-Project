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
  @Input() idx!: number;
  @Input() quiz!: Quiz;
  shufflerAnswers!: string[];
  @ViewChildren('input') inputs!: QueryList<ElementRef>;

  // đưa đáp án chọn vào subject

  onChoose(data: QuizAnswer) {
    this.quizService.addAnswer(data);
  }
  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    if (this.quiz?.result) {
      this.shufflerAnswers = this.quiz?.result.isCurrentChoose.allAnswer;
    } else {
      this.shufflerAnswers = this.quiz.allAnswers;
    }
  }

  ngOnDestroy(): void {}
}
