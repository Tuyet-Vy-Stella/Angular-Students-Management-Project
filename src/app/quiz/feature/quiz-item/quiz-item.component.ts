import { QuizAnswer } from './../../data-access/quiz.model';
import {
  Component,
  Input,
  OnInit,
  ViewChildren,
  QueryList,
  ElementRef,
  OnDestroy,
} from '@angular/core';
import { Quiz} from '../../data-access/quiz.model';
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
  shufflerAnswer!: string[];
  answers!: string[];
  // quiz$!: Observable<Quiz>;

  // đưa đáp án chọn vào subject
  onChoose(data: QuizAnswer) {
    this.quizService.addAnswer(data);
  }
  constructor(private quizService: QuizService) {}

  handleChoose(answer: string): QuizAnswer {
    return {
      quizID: this.quiz.id,
      answer,
      score: this.quiz.score,
      isChoose: true,
    };
  }

  ngOnInit(): void {
    this.shufflerAnswers = this.quiz.allAnswers;
  }

  ngOnDestroy(): void {}
}
