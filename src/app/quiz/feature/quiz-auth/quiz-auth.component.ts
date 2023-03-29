import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-quiz-auth',
  templateUrl: './quiz-auth.component.html',
  styleUrls: ['./quiz-auth.component.scss'],
})
export class QuizAuthComponent {
  constructor(private fb: FormBuilder) {}
  quizAuthForm = this.fb.group({
    full_name: ['', Validators.compose([Validators.required])],
    student_id: ['', Validators.compose([Validators.required])],
    subject_id: ['', Validators.compose([Validators.required])],
  });

  submitForm() {
    console.log(this.quizAuthForm.value);
    console.log(this.quizAuthForm.controls['full_name']);
  }
}
