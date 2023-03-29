import { Component, NgModule } from '@angular/core';
import { QuizModule } from './app.module';


@Component({
  selector: 'app-quiz-page',
  templateUrl: './quiz-page.component.html',
  styleUrls: ['./quiz-page.component.scss'],
})
export class QuizPageComponent {
  selectedAnswer: string = ''; // Thêm thuộc tính selectedAnswer vào đây

  constructor() { }
  showBackdrop = false;

  onSubmit() {
    // handle submit logic here
    this.showBackdrop = true;
  }
  
}
