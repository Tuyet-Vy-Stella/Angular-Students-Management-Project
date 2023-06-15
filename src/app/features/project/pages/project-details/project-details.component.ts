import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { icons } from '../../utils/icons';
import { ClassroomService } from '../../services/project.service';
import {
    combineLatest,
    map,
    Observable,
    startWith,
    Subject,
    takeUntil,
} from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ClassroomAddComponent } from '../project-add/project-add.component';
import { InternListComponent } from 'app/features/intern/pages';

@Component({
    selector: 'app-classroom-details',
    templateUrl: './project-details.component.html',
    styleUrls: ['./project-details.component.scss'],
    providers: [DialogService, ConfirmationService],
})
export class ClassroomDetailsComponent implements OnInit, OnDestroy {
    constructor(
        private classroomService: ClassroomService,
        private toastrService: ToastrService,
        private dialogService: DialogService,
        private confirmService: ConfirmationService
    ) {}

    @ViewChild(InternListComponent) x!: InternListComponent;

    ref!: DynamicDialogRef;

    internCols = [
        {
            field: 'id',
            header: '#',
        },
        {
            field: 'name',
            header: 'Name',
        },
        {
            field: 'email',
            header: 'Email',
        },
        {
            field: 'gender',
            header: 'Gender',
        },
        {
            field: 'phone',
            header: 'Phone',
        },
    ];

    mentorCols = [
        {
            header: '#',
            field: 'teacher_id',
        },
        {
            header: 'Technology',
            field: 'name',
        },
        {
            header: 'Name',
            field: 'teacher',
        },
    ];
    showModal = false;
    showAddModal = false;
    icons = icons;

    isSearchTeacher$ = this.classroomService.isSearchTeacher$;
    currentClassId$ = this.classroomService.currentClassId$;
    isTeacherTab$ = this.classroomService.isTeacherTab$;
    getAddListTeacher$!: Observable<
        {
            id: number;
            name: string;
            subject_name: string;
        }[]
    >;

    // Modal
    currentDeletedType!: number;
    currentDeletedId!: number;
    deleteModelContent = {
        header: '',
        mainContent:
            'This action cannot be undone. Are you sure you want to continue?',
    };

    // View Model
    vm$ = combineLatest([
        this.classroomService.getTeachers().pipe(startWith([])),
        this.classroomService.getStudents().pipe(startWith([])),
        this.classroomService.currentClass$.pipe(
            startWith({ grade: '', section: '', form_teacher: '', id: -1 })
        ),
        this.isTeacherTab$,
        this.isSearchTeacher$,
        this.classroomService.searchList$.pipe(startWith([])),
        this.classroomService.$loadingStudent,
        this.classroomService.$loadingTeacher,
    ]).pipe(
        map(
            ([
                teachers,
                students,
                currentClass,
                isTeacherTab,
                isSearchTeacher,
                dropDownList,
                loadingStudent,
                loadingTeacher,
            ]) => ({
                teachers,
                students,
                currentClass,
                isTeacherTab,
                isSearchTeacher,
                dropDownList,
                loadingStudent,
                loadingTeacher,
            })
        )
    );
    items: MenuItem[] = [
        { label: 'Mentors', icon: 'pi pi-fw pi-home', id: 'mentor' },
        { label: 'Interns', icon: 'pi pi-fw pi-calendar', id: 'intern' },
    ];

    activeItem: MenuItem = this.items[0];

    private destroy$ = new Subject<boolean>();

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }

    ngOnInit(): void {
        this.classroomService.init();
    }

    handleCloseModal() {
        this.showModal = false;
    }

    onOpenAddTeacherModal() {
        this.showAddModal = true;
        this.getAddListTeacher$ = this.classroomService.getAddListTeacher();
    }

    onAcceptAddTeacherModal(event: number) {
        this.classroomService
            .addNewTeacherToClass(event)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (value) => {
                    this.toastrService.success('Add teacher successfully !!!');
                },
                error: (err) => {
                    console.log(err);
                    this.toastrService.error(err.error.detail);
                },
                complete: () => {
                    this.showAddModal = false;
                },
            });
    }

    onActiveItemChange(event: MenuItem) {
        this.activeItem = event;
    }

    onOpenModal(deleteType: number, id?: number) {
        this.currentDeletedType = deleteType;

        if (id === -1) return;
        if (id) {
            this.currentDeletedId = id;
        }

        if (deleteType === 1) {
            this.deleteModelContent.header = 'Delete Class';
        } else if (deleteType === 3) {
            this.deleteModelContent.header = 'Delete Teacher';
        }
        this.showModal = true;
    }

    handleAddClassroom() {
        this.ref = this.dialogService.open(ClassroomAddComponent, {
            header: 'Add Classroom',
            width: '50%',
            contentStyle: { overflow: 'auto' },
            baseZIndex: 10000,
            maximizable: true,
            data: {
                action: 'add',
            },
        });
    }

    onConfirmModal() {
        this.showModal = false;
        if (this.currentDeletedType === 1) {
            this.classroomService
                .deleteClass(this.currentDeletedId)
                .pipe(takeUntil(this.destroy$))
                .subscribe({
                    next: (value) => {
                        this.toastrService.success(value.message);
                    },
                    error: (err) => {
                        console.log(err);
                        this.toastrService.error(
                            "Class still have students. Can't be deleted"
                        );
                    },
                });
        } else if (this.currentDeletedType === 3) {
            this.classroomService
                .deleteTeacher(this.currentDeletedId)
                .subscribe({
                    next: () => {
                        this.toastrService.success(
                            'Update successfully. Please stand by'
                        );
                    },
                    error: (err) => {
                        console.log(err);
                        this.toastrService.error(
                            'Something went wrong. Try another time'
                        );
                    },
                });
        }
    }
}
