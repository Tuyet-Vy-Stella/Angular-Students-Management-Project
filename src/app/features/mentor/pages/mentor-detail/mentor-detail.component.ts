import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs';
import { Teacher } from '../../models/mentor.model';
import { TeacherService } from '../../services/mentor.service';
import {
    FormArray,
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { Subject } from 'app/features/technology/models/technology.model';
import { Class } from 'app/features/project/models/project.model';

@Component({
    selector: 'app-mentor-detail',
    templateUrl: './mentor-detail.component.html',
    styleUrls: ['./mentor-detail.component.scss'],
})
export class MentorDetailComponent implements OnInit {
    constructor(
        private route: ActivatedRoute,
        private teacherService: TeacherService,
        private toastrService: ToastrService,
        private router: Router,
        private fb: FormBuilder
    ) {}

    teacherForm!: FormGroup;
    subjectList: Subject[] = [];
    isFetchingToCreateOrUpdateTeacher = false;
    isFetchingToGet = false;
    createMode = false;
    teacherId!: number;
    classList: Class[] = [];
    ngOnInit(): void {
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

        this.fetchMentor();

        // Fetch subject list
        this.teacherService.getSubjects().subscribe({
            next: (response) => {
                this.subjectList = response;
            },
            error: (error) => {
                this.toastrService.error(
                    'Get subject list failed. Please try again'
                );
            },
        });

        this.createMode = this.router.url.includes('create');

        // Fetch class list
        this.teacherService.getClassList().subscribe({
            next: (response) => {
                this.classList = response.map((item) => ({
                    ...item,
                    name: item.grade + item.section,
                }));
            },
            error: (error) => {
                this.toastrService.error(
                    'Get class list failed. Please try again'
                );
            },
        });
    }

    fetchMentor() {
        this.route.params.subscribe((params: Params) => {
            const id = +params['id'];
            if (!id) {
                this.isFetchingToGet = false;
                this.addClass();
                return;
            }
            this.teacherId = id;
            this.isFetchingToGet = true;
            this.teacherService
                .getTeacherById(id)
                .pipe(
                    tap(() => {
                        this.isFetchingToGet = false;
                    })
                )
                .subscribe({
                    next: (response) => {
                        const { id, created_at, class_id, ...rest } = response;
                        this.teacherForm.patchValue({
                            ...rest,
                        });
                        const class_control = class_id.map((item: any) =>
                            this.fb.control(item)
                        );
                        this.teacherForm.setControl(
                            'class_id',
                            this.fb.array(class_control)
                        );
                    },
                    error: (error) => {
                        this.toastrService.error(
                            'Get teacher failed. Please try again'
                        );
                    },
                });
        });
    }

    checkFieldEmpty(
        formControl: FormControl
    ): { [key: string]: boolean } | null {
        if (typeof formControl.value === 'string') {
            return formControl.value.toString().trim() ? null : { empty: true };
        }
        return null;
    }

    get class_id(): FormArray {
        return this.teacherForm.get('class_id') as FormArray;
    }

    addClass() {
        this.class_id.push(this.fb.control(null, [Validators.required]));
    }

    removeClass() {
        this.class_id.removeAt(this.class_id.length - 1);
    }

    onSubmit() {
        this.isFetchingToCreateOrUpdateTeacher = true;
        if (this.teacherId) {
            // Update teacher
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
                        this.router.navigate(['/mentors']);
                    },
                    error: (error) => {
                        this.isFetchingToCreateOrUpdateTeacher = false;
                    },
                    complete: () => {
                        this.isFetchingToCreateOrUpdateTeacher = false;
                    },
                });
        } else {
            if (!this.createMode) return;
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
        }
    }
}
