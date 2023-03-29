import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject } from 'src/app/shared/model/subject.model';

import { TeacherService } from '../../data-access/teacher.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-teacher-edit',
  templateUrl: './teacher-edit.component.html',
  styleUrls: ['./teacher-edit.component.scss'],
})
export class TeacherEditComponent {
  teacherForm!: FormGroup;
  subjectList: Subject[] = [];
  isFetchingToCreateOrUpdateTeacher = false;
  isFetchingToGetTeacher = false;
  createMode = false;
  teacherId: number | null = null;
  classList: any;
  classTeacherList: number[] = [];

  constructor(
    private teacherService: TeacherService,
    private toastrService: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Init create teacher form group
    this.teacherForm = new FormGroup({
      name: new FormControl(null, {
        validators: [Validators.required, this.checkFieldEmpty],
      }),
      gender: new FormControl('male', [Validators.required]),
      birthday: new FormControl(null, [Validators.required]),
      address: new FormControl(null, [
        Validators.required,
        this.checkFieldEmpty,
      ]),
      phone: new FormControl(null, [
        Validators.required,
        Validators.pattern('[- +()0-9]+'),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      subject_id: new FormControl(null, [Validators.required]),
      joined_date: new FormControl(null, [Validators.required]),
    });

    //  Set current mode
    this.createMode = this.router.url.includes('create');

    // Fetch subject list
    this.teacherService.getSubjects().subscribe({
      next: (response) => {
        this.subjectList = response;
      },
      error: (error) => {
        this.toastrService.error('Get subject list failed. Please try again');
        console.error(error);
      },
    });

    // Fetch class list
    this.teacherService.getClassList().subscribe({
      next: (response) => {
        this.classList = response;
        
      },
      error: (error) => {
        this.toastrService.error('Get class list failed. Please try again');
        console.error(error);
      },
    });

    // Handle for update mode
    if (!this.createMode) {
      this.isFetchingToGetTeacher = true;
      this.route.params.subscribe((params: Params) => {
        const id = +params['id'];
        if (id) {
          this.teacherId = id;

          // Fetch teacher
          this.teacherService.getTeacherById(this.teacherId).subscribe({
            next: (response) => {
              const { id, created_at, class_id, ...rest } = response;
              this.teacherForm.setValue(rest);
              this.classTeacherList = class_id;
              console.log('class_id', class_id)
              this.classTeacherList.map((item) => {
                this.teacherForm.addControl(
                  `class_id_${item}`,
                  new FormControl(null, [Validators.required])
                );
                this.teacherForm.controls[`class_id_${item}`].setValue(item);
              });
            },
            error: (error) => {
              this.isFetchingToGetTeacher = false;
              this.toastrService.error('Get teacher failed. Please try again');
              console.error(error);
            },
            complete: () => {
              this.isFetchingToGetTeacher = false;
            },
          });
        }
      });
    }
  }

  checkFieldEmpty(formControl: FormControl): { [key: string]: boolean } | null {
    if (typeof formControl.value === 'string') {
      return formControl.value.toString().trim() ? null : { empty: true };
    }
    return null;
  }

  addClass() {
    this.classTeacherList.push(0);
    this.teacherForm.addControl(
      `class_id_${this.classTeacherList.length}`,
      new FormControl(null, [Validators.required])
    );
  }

  onSubmit() {
    this.isFetchingToCreateOrUpdateTeacher = true;
    if (this.createMode) {
      // Create teacher
      this.teacherService.createTeacher(this.teacherForm.value).subscribe({
        next: () => {
          this.isFetchingToCreateOrUpdateTeacher = false;

          // Show alert
          this.toastrService.success('Create teacher successfully');

          // Reset form
          this.teacherForm.reset();
        },
        error: (error) => {
          this.isFetchingToCreateOrUpdateTeacher = false;
          console.log(error);
        },
        complete: () => {
          this.isFetchingToCreateOrUpdateTeacher = false;
        },
      });
    } else {
      // Update teacher
      if (this.teacherId) {
        this.teacherService
          .updateTeacher(this.teacherId, this.teacherForm.value)
          .subscribe({
            next: () => {
              this.isFetchingToCreateOrUpdateTeacher = false;
              this.toastrService.success('Update teacher successfully');
              setTimeout(() => {
                this.router.navigate(['/teachers']);
              }, 1000);
            },
            error: (error) => {
              this.isFetchingToCreateOrUpdateTeacher = false;
              console.log(error);
            },
            complete: () => {
              this.isFetchingToCreateOrUpdateTeacher = false;
            },
          });
      }
    }
  }
}
