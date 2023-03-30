import { Component, Input , OnInit} from '@angular/core';
import { FinalResult, Quiz } from '../../data-access/quiz.model';

@Component({
  selector: 'app-quiz-result',
  templateUrl: './quiz-result.component.html',
  styleUrls: ['./quiz-result.component.scss']
})
export class QuizResultComponent implements OnInit {
  @Input() finalResult: FinalResult = {
    finalScore: 0,
    quizSelect: []
  }
  @Input() quizList!: Quiz[];
  showReview = false

  ngOnInit () {
    console.log(this.finalResult)
  }
}
