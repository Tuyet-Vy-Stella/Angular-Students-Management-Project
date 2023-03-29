import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuizPageComponent } from './quiz-page.component';

@NgModule({
  declarations: [
    QuizPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class QuizModule { }