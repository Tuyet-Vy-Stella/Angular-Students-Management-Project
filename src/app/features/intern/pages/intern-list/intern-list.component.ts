import { Component } from '@angular/core';
import {
    faBorderAll,
    faChevronLeft,
    faChevronRight,
    faList,
    faMagnifyingGlass,
    faPenToSquare,
    faPlus,
    faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';

import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { tap } from 'rxjs';
import { InternCreateComponent } from '../../components';
import { Student } from '../../models/intern.model';
import { StudentService } from '../../services/intern.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-student-list',
    templateUrl: './intern-list.component.html',
    styleUrls: ['./intern-list.component.scss'],
    providers: [ConfirmationService, DialogService],
})
export class InternListComponent {
    constructor(
        private studentService: StudentService,
        private toastrService: ToastrService,
        private confirmationService: ConfirmationService,
        private dialogService: DialogService,
        private router: Router
    ) {}
    icons = {
        faList,
        faBorderAll,
        faPlus,
        faChevronLeft,
        faChevronRight,
        faPenToSquare,
        faTrash,
        faMagnifyingGlass,
    };
    studentList: Student[] = [];
    studentListToShow: Student[] = [];

    isFetchingStudentList = false;
    isFetchingToDeleteStudent = false;
    isDelete = false;
    ref!: DynamicDialogRef;
    // tableViewMode = true;

    first: number = 0;
    rows: number = 10;
    page: number = 0;

    cols = [
        {
            field: 'id',
            header: '#',
        },
        {
            field: 'name',
            header: 'Name',
            link: ['id'],
        },
        {
            field: 'class_name',
            header: 'Class',
        },
        {
            field: 'gender',
            header: 'Gender',
        },
        {
            field: 'phone',
            header: 'Phone',
        },
        {
            field: 'email',
            header: 'Email',
        },
    ];

    ngOnInit() {
        // Fetch student data
        this.fetchStudentList();
    }

    fetchStudentList() {
        this.isFetchingStudentList = true;
        this.studentService
            .getStudentList()
            .pipe(
                tap(() => {
                    this.isFetchingStudentList = false;
                })
            )
            .subscribe({
                next: (response) => {
                    if (response) {
                        // Update student list
                        this.studentList = response;

                        // Update student list to show
                        this.studentListToShow = this.studentList.slice(
                            this.first,
                            this.rows
                        );
                    }
                },
            });
    }

    confirm(student: Student) {
        const studentId = student.id;
        this.confirmationService.confirm({
            header: 'Delete Intern',
            message: 'Are you sure that you want to delete this intern?',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                const nameStudent = this.studentList.find(
                    (student) => student.id === studentId
                )?.name;
                this.isFetchingToDeleteStudent = true;

                // Listen fetch event
                this.studentService.deleteStudent(studentId).subscribe({
                    next: () => {
                        this.isFetchingToDeleteStudent = false;
                        this.toastrService.success(
                            `Delete intern "${nameStudent}" successfully`
                        );

                        // Remove this student on student list
                        this.studentList = this.studentList.filter(
                            (student) => student.id !== studentId
                        );

                        // Reset student id to delete
                    },
                    error: () => {
                        this.isFetchingToDeleteStudent = false;
                        this.toastrService.error(
                            `Delete intern "${nameStudent}" failure`
                        );
                    },
                });
            },
        });
    }

    handleAddIntern() {
        this.ref = this.dialogService.open(InternCreateComponent, {
            header: 'Create a Intern',
            width: '70%',
            contentStyle: { overflow: 'auto' },
            baseZIndex: 10000,
            maximizable: true,
            data: {
                onClose: () => {
                    this.ref.close();
                },
            },
        });
    }

    handleUpdateIntern(student: Student) {
        this.router.navigate([`/students/${student.id}`], {
            queryParams: { edit: true },
        });
    }
}
