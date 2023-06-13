import { Component } from '@angular/core';
import {
    FormArray,
    FormControl,
    FormGroup,
    Validators,
    FormBuilder,
} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { TeacherService } from '../../services/mentor.service';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'app/features/technology/models/technology.model';
import { Class } from 'app/features/project/models/project.model';

@Component({
    selector: 'app-teacher-edit',
    templateUrl: './mentor-edit.component.html',
    styleUrls: ['./mentor-edit.component.scss'],
})
export class TeacherEditComponent {
    teacherForm!: FormGroup;
    subjectList: Subject[] = [];
    isFetchingToCreateOrUpdateTeacher = false;
    isFetchingToGetTeacher = false;
    createMode = false;
    teacherId: number | null = null;
    classList: Class[] = [];

    constructor(
        private teacherService: TeacherService,
        private toastrService: ToastrService,
        private router: Router,
        private route: ActivatedRoute,
        private fb: FormBuilder
    ) {}

    get class_id(): FormArray {
        return this.teacherForm.get('class_id') as FormArray;
    }

    ngOnInit() {
        // Init create teacher form group
        this.teacherForm = this.fb.group({
            name: ['', [Validators.required, this.checkFieldEmpty]],
            gender: ['male', [Validators.required]],
            birthday: [null, [Validators.required]],
            address: ['', [Validators.required, this.checkFieldEmpty]],
            phone: [
                null,
                [Validators.required, Validators.pattern('[- +()0-9]+')],
            ],
            email: [null, [Validators.required, Validators.email]],
            subject_id: [null, [Validators.required]],
            joined_date: [null, [Validators.required]],
            class_id: this.fb.array([]),
        });

        //  Set current mode
        this.createMode = this.router.url.includes('new');

        // Fetch subject list
        this.teacherService.getSubjects().subscribe({
            next: (response) => {
                this.subjectList = response;
            },
            error: (error) => {
                this.toastrService.error(
                    'Get subject list failed. Please try again'
                );
                console.error(error);
            },
        });

        // Fetch class list
        this.teacherService.getClassList().subscribe({
            next: (response) => {
                this.classList = response;
            },
            error: (error) => {
                this.toastrService.error(
                    'Get class list failed. Please try again'
                );
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
                    this.teacherService
                        .getTeacherById(this.teacherId)
                        .subscribe({
                            next: (response) => {
                                const { id, created_at, class_id, ...rest } =
                                    response;
                                this.teacherForm.patchValue({
                                    ...rest,
                                });
                                const class_control = class_id.map(
                                    (item: any) => this.fb.control(item)
                                );
                                this.teacherForm.setControl(
                                    'class_id',
                                    this.fb.array(class_control)
                                );
                            },
                            error: (error) => {
                                this.isFetchingToGetTeacher = false;
                                this.toastrService.error(
                                    'Get teacher failed. Please try again'
                                );
                                console.error(error);
                            },
                            complete: () => {
                                this.isFetchingToGetTeacher = false;
                            },
                        });
                }
            });
        } else {
            this.addClass();
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

    addClass() {
        this.class_id.push(this.fb.control(null, [Validators.required]));
    }

    removeClass() {
        this.class_id.removeAt(this.class_id.length - 1);
    }

    onSubmit() {
        this.isFetchingToCreateOrUpdateTeacher = true;
        if (this.createMode) {
            // Create teacher
            this.teacherService
                .createTeacher({
                    ...this.teacherForm.value,
                    // get unique class_id
                    class_id: this.class_id.value.filter(
                        (item: any, index: any) =>
                            this.class_id.value.indexOf(item) === index
                    ),
                })
                .subscribe({
                    next: () => {
                        this.isFetchingToCreateOrUpdateTeacher = false;
                        // Show alert
                        this.toastrService.success(
                            'Create teacher successfully'
                        );
                        // Reset form
                        this.teacherForm.reset();
                    },
                    error: (error) => {
                        this.isFetchingToCreateOrUpdateTeacher = false;
                        this.toastrService.error(
                            error.error.detail ||
                                'Create teacher failed. Please try again'
                        );
                    },
                    complete: () => {
                        this.isFetchingToCreateOrUpdateTeacher = false;
                    },
                });
        } else {
            // Update teacher
            if (this.teacherId) {
                this.teacherService
                    .updateTeacher(this.teacherId, {
                        ...this.teacherForm.value,
                        // get unique class_id
                        class_id: this.class_id.value.filter(
                            (item: any, index: any) =>
                                this.class_id.value.indexOf(item) === index
                        ),
                    })
                    .subscribe({
                        next: () => {
                            this.isFetchingToCreateOrUpdateTeacher = false;
                            this.toastrService.success(
                                'Update teacher successfully'
                            );
                            setTimeout(() => {
                                this.router.navigate(['/mentors']);
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
