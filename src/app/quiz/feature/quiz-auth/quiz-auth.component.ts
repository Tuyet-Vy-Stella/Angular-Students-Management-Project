import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { StudentService } from 'src/app/students/data-access/student.service';
import { SubjectService } from 'src/app/subject/data-access/subject.service';

@Component({
  selector: 'app-quiz-auth',
  templateUrl: './quiz-auth.component.html',
  styleUrls: ['./quiz-auth.component.scss'],
})
export class QuizAuthComponent implements OnInit {
  message = '';
  showBackdrop = false;
  isLoading = false;
  selectedAnswer: string = ''; // Thêm thuộc tính selectedAnswer vào đây
  inputStudentID: number = 0; //
  inputSubjectID: number = 0; //

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private studentService: StudentService,
    private subjectService: SubjectService
  ) {}

  ngOnInit(): void {
    localStorage.clear();
  }

  infoUser = this.fb.group({
    full_name: [''],
    student_id: [, [Validators.required, Validators.pattern(/[0-9\+\-\ ]/)]],
    subject_id: [, [Validators.required, Validators.pattern(/[0-9\+\-\ ]/)]],
  });
  get form() {
    return this.infoUser.controls;
  }

  onSubmit() {
    this.inputStudentID = Number(this.infoUser.value.student_id);
    this.inputSubjectID = Number(this.infoUser.value.subject_id);

    const student = this.studentService.getStudentById(this.inputStudentID);
    const subject = this.subjectService.getSubjectById(this.inputSubjectID);

    if (this.inputStudentID && this.inputSubjectID) {
      this.isLoading = true;
      this.message = '';
      student.subscribe({
        next: (data) => {
          localStorage.setItem('student_id', data.id.toString());
          subject.subscribe({
            next: (data) => {
              if (data.id === undefined) {
                this.isLoading = false;
                this.message = 'Subject ID is not valid!';
              } else {
                let startAt = new Date().getMinutes()
                localStorage.setItem('subject_id', data.id.toString());
                localStorage.setItem('isLogin', 'true');
                localStorage.setItem('startAt', String(startAt))
                this.showBackdrop = !this.showBackdrop;
                this.router.navigate(['/quiz/page']);
              }
            },
          });
        },
        error: (err) => {
          this.isLoading = false;
          this.message = 'Student ID is not valid!';
        },
      });
    } else if (this.inputStudentID && this.inputSubjectID === 0) {
      this.isLoading = true;
      this.message = '';
      setTimeout(() => {
        this.isLoading = false;
        this.message = 'Please enter a subject ID';
      }, 2000);
    } else if (this.inputStudentID === 0 && this.inputSubjectID) {
      this.isLoading = true;
      this.message = '';
      setTimeout(() => {
        this.isLoading = false;
        this.message = 'Please enter a student ID';
      }, 2000);
    } else if (this.inputStudentID === 0 && this.inputSubjectID === 0) {
      this.isLoading = true;
      this.message = '';
      setTimeout(() => {
        this.isLoading = false;
        this.message = 'Please fill out all fields.';
      }, 2000);
    }
  }

  handleSubmit() {}

  handleCancel() {
    this.showBackdrop = !this.showBackdrop;
    this.router.navigate(['/home'])
  }

  onClearMessage() {
    this.message = '';
  }
}
