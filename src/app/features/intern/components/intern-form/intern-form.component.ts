import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { ClassroomService } from 'app/features/project/services/project.service';
import { Student } from '../../models/intern.model';
import { StudentService } from '../../services/intern.service';

interface Class {
    id: number;
    grade: string;
    section: string;
    form_teacher_id: number;
    form_teacher_name: string;
    created_at: string;
}

//update -> student
//create -> no student

@Component({
    selector: 'app-intern-form',
    templateUrl: './intern-form.component.html',
    styleUrls: ['./intern-form.component.scss'],
})
export class InternFormComponent {
    studentForm!: FormGroup;
    isFetchingToCreateOrUpdateStudent = false;
    classList!: Class[];
    @Input() student!: Student;

    constructor(
        private studentService: StudentService,
        private classroomService: ClassroomService,
        private toastrService: ToastrService
    ) {}

    ngOnInit() {
        // Init create student form group
        this.studentForm = new FormGroup({
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
            email: new FormControl(null, [
                Validators.required,
                Validators.email,
            ]),
            class_id: new FormControl(null, [Validators.required]),
        });

        // Get class list
        this.classroomService.getClasses().subscribe({
            next: (classes) => {
                this.classList = classes;
            },
        });

        // Handle for update mode
        if (this.student) {
            const { id, created_at, class_name, ...rest } = this.student;
            this.studentForm.setValue(rest);
        }
    }

    checkFieldEmpty(
        formControl: FormControl
    ): { [key: string]: boolean } | null {
        if (typeof formControl.value === 'string') {
            return formControl.value.toString().trim() ? null : { empty: true };
        }
        return null;
    }

    onSubmit() {
        this.isFetchingToCreateOrUpdateStudent = true;
        const bodyData = {
            ...this.studentForm.value,
            class_id: +this.studentForm.value.class_id,
        };

        if (this.student) {
            // Update intern
            this.studentService
                .updateStudent(this.student.id, this.studentForm.value)
                .subscribe({
                    next: (response) => {
                        this.toastrService.success(
                            'Update student successfully',
                            'Update student'
                        );
                    },
                    error: (error) => {
                        this.isFetchingToCreateOrUpdateStudent = false;
                        this.toastrService.error(
                            'Update student failure',
                            'Update student'
                        );
                    },
                    complete: () => {
                        this.isFetchingToCreateOrUpdateStudent = false;
                    },
                });
        } else {
            // Create intern
            this.studentService.createStudent(bodyData).subscribe(
                () => {
                    // Show success toast
                    this.toastrService.success(
                        'Create student successfully',
                        'Create student'
                    );

                    // Reset form
                    this.studentForm.reset({
                        gender: 'male',
                    });
                },
                () => {
                    this.isFetchingToCreateOrUpdateStudent = false;
                    this.toastrService.error(
                        'Create student failure',
                        'Create student'
                    );
                },
                () => (this.isFetchingToCreateOrUpdateStudent = false)
            );
        }
    }
}
