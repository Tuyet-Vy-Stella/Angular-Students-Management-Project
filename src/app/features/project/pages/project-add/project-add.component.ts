import {
    Component,
    ElementRef,
    OnDestroy,
    OnInit,
    ViewChild,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ClassroomEditService } from '../../services/project-edit.service';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { ITeacher } from '../../utils/project';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-classroom-add',
    templateUrl: './project-add.component.html',
    styleUrls: ['./project-add.component.scss'],
})
export class ClassroomAddComponent implements OnInit, OnDestroy {
    teacherSearchList$!: Observable<ITeacher[]>;
    teacherActiveOption$!: BehaviorSubject<string>;

    isLoading = false;
    isEdit$ = this.classroomEditService.isEdit$;
    currentEditID!: number;

    @ViewChild('gradeSelect', { static: true })
    gradeSelectEl!: ElementRef<HTMLSelectElement>;

    createForm = this.fb.group(
        {
            teacherId: ['', Validators.required],
            grade: ['10', Validators.required],
            name: ['', Validators.required],
        },
        {
            updateOn: 'blur',
        }
    );

    error: string = '';

    private destroy$ = new Subject<boolean>();

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private toastrService: ToastrService,
        private classroomEditService: ClassroomEditService,
        private router: Router
    ) {}

    onSubmit() {
        let classroom = {
            teacherId: this.createForm.get('teacherId')?.value ?? '',
            grade: this.createForm.get('grade')?.value ?? '',
            name: this.createForm.get('name')?.value ?? '',
        };

        if (this.isEdit$.getValue()) {
            this.onUpdateClassroom(classroom);
        } else {
            this.onCreateClassroom(classroom);
        }
    }

    onUpdateClassroom(classroom: {
        teacherId: string;
        grade: string;
        name: string;
    }) {
        this.isLoading = true;
        this.classroomEditService
            .updateClass(classroom, this.currentEditID)
            .subscribe({
                next: () => {
                    this.toastrService.success(
                        'Update successfully. Please stand by'
                    );
                    this.router.navigate(['/projects']);
                },
                error: (err) => {
                    console.log(err);
                    this.toastrService.error(
                        'Something went wrong. Try another time'
                    );
                },
                complete: () => {
                    this.isLoading = false;
                },
            });
    }

    onCreateClassroom(classroom: {
        teacherId: string;
        grade: string;
        name: string;
    }) {
        this.error = '';
        if (this.createForm.valid && this.createForm.value) {
            this.isLoading = true;
            try {
                this.classroomEditService
                    .createNewClass(classroom)
                    .pipe(takeUntil(this.destroy$))
                    .subscribe({
                        next: () => {
                            this.classroomEditService.updateTeacherSearchList(
                                this.createForm.get('teacherId')?.value ?? ''
                            );
                            this.toastrService.success(
                                'Create class successfully'
                            );
                            this.createForm.reset();
                            this.teacherActiveOption$.next(
                                '' +
                                    this.classroomEditService.teacherSearchList$.getValue()[0]
                                        .id
                            );
                            this.gradeSelectEl.nativeElement.selectedIndex = 0;
                        },
                        error: () => {
                            this.toastrService.error(
                                'Something went wrong. Try another time'
                            );
                        },
                        complete: () => {
                            this.isLoading = false;
                        },
                    });
            } catch (e: unknown) {
                if (e instanceof Error) {
                    this.error = `${e.message}`;
                    this.isLoading = false;
                }
            }
        }
    }

    ngOnInit(): void {
        this.route.params.pipe(takeUntil(this.destroy$)).subscribe((params) => {
            this.currentEditID = params['id'];
            this.isEdit$.next(!!params['id']);
        });

        if (this.isEdit$.getValue()) {
            if (!this.classroomEditService.getCurrentValue().grade) {
                this.router.navigate(['/projects']);
            }
            this.createForm.patchValue(
                this.classroomEditService.getCurrentValue()
            );
        }

        this.teacherSearchList$ =
            this.classroomEditService.getEditTeacherList();
        this.teacherActiveOption$ =
            this.classroomEditService.teacherActiveOption$;
        this.classroomEditService.init();

        this.teacherActiveOption$
            .pipe(takeUntil(this.destroy$))
            .subscribe((data) => {
                this.createForm.patchValue({ teacherId: '' + data });
            });
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
}
