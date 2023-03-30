import { Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { delay, Observable } from 'rxjs';
import { FinalResult, Quiz } from '../../data-access/quiz.model';
import { QuizService } from '../../data-access/quiz.service';
import { QuizItemComponent } from '../quiz-item/quiz-item.component';

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss'],
})
export class QuizListComponent implements OnInit {
  @Input() quizList!: Quiz[];
  @Output('result') result = new EventEmitter<any>()

  @ViewChildren(QuizItemComponent) quizItems!: QueryList<QuizItemComponent>

  finalResult: FinalResult = {
    finalScore: 0,
    quizSelect: []
  }
  constructor(private quizService: QuizService) {}

  ngOnInit(): void {

  }

  handleSelectAnswer(event: any, id: number) {
    console.log("event: ",event)
    console.log("id: ",id)
    this.quizService.getQuizById(id).pipe().subscribe(
      (val) => {
        if(event.isCorrect) {
          this.finalResult.finalScore += val.score
          this.finalResult.quizSelect = [...this.finalResult.quizSelect, id]
        }
      }
    )
  }

  handleSubmit() {
    let items = this.quizItems.toArray()
    let countQuizNotSelect: number = 0
    items.forEach(item => {
      let temp = item.inputs.toArray().some((input) => {
        return input.nativeElement.checked
      })
      if(!temp) {
        countQuizNotSelect++;
      }
    });
    if(countQuizNotSelect === 0) {
      this.result.emit(this.finalResult)
      console.log(this.finalResult)
    } else {
      alert("Please fill all the input!!")
    }
  }
}
