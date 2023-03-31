import {
  Component,
  Input,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { Quiz } from '../../data-access/quiz.model';
import { QuizService } from '../../data-access/quiz.service';

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss'],
})
export class QuizListComponent implements OnInit, OnDestroy {
  @Input() quizList!: Quiz[];
  // @ViewChildren(QuizItemComponent) quizItems!: QueryList<QuizItemComponent>;

  constructor(private quizService: QuizService) {}

  ngOnInit(): void {}

  ngOnDestroy() {
    // let items = this.quizItems.toArray()
    // let countQuizNotSelect: number = 0
    // items.forEach(item => {
    //   let temp = item.inputs.toArray().some((input) => {
    //     return input.nativeElement.checked
    //   })
    //   if(!temp) {
    //     countQuizNotSelect++;
    //   }
    // });
    // if(countQuizNotSelect === 0) {
    //   console.log("Done")
    // } else {
    //   alert("Please fill all the input!!")
    // }
  }
}
