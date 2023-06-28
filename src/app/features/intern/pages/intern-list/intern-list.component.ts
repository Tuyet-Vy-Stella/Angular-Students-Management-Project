import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';

import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InternDetail } from '../../models/intern.model';
import { InternService } from '../../services/intern.service';
import { Router } from '@angular/router';
import { ColListData } from '@shared/components/list-data/list-data.model';
import { PageInfo } from '@shared/model/common';

@Component({
    selector: 'app-student-list',
    templateUrl: './intern-list.component.html',
    styleUrls: ['./intern-list.component.scss'],
    providers: [ConfirmationService, DialogService, MessageService],
})
export class InternListComponent {
    constructor(
        private internService: InternService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private dialogService: DialogService,
        private router: Router
    ) {}

    internList!: InternDetail[];
    totalRecords = 0;
    isFetching = false;
    isDeleting = false;
    isAddDialog = false;

    ref!: DynamicDialogRef;

    pagination: PageInfo = {
        page: 0,
        limit: 10,
    };

    cols: ColListData[] = [
        {
            field: 'name',
            type: 'link',
            url: ['interns', 'id'],
        },
        {
            field: 'email',
        },
        {
            field: 'gender',
        },
        {
            header: 'phone number',
            field: 'phone',
        },
        {
            field: 'status',
            type: 'status',
        },
        {
            field: 'mentor',
            type: 'child',
            child: {
                field: 'name',
                url: ['mentors', 'id'],
            },
        },
    ];

    ngOnInit() {
        this.fetchStudentList();
    }

    fetchStudentList() {
        this.isFetching = true;
        this.internService
            .getInternList()

            .subscribe({
                next: (response) => {
                    this.isFetching = false;
                    this.internList = response.content;
                    this.totalRecords = response.totalElements;
                },
                error: () => {
                    this.isFetching = false;
                },
            });
    }

    // confirm(student: Student) {
    //     const studentId = student.id;
    //     this.confirmationService.confirm({
    //         header: 'Delete Intern',
    //         message: 'Are you sure that you want to delete this intern?',
    //         icon: 'pi pi-exclamation-triangle',
    //         accept: () => {
    //             const nameStudent = this.studentList.find(
    //                 (student) => student.id === studentId
    //             )?.name;
    //             this.isFetchingToDeleteStudent = true;

    //             // Listen fetch event
    //             this.studentService.deleteStudent(studentId).subscribe({
    //                 next: () => {
    //                     this.isFetchingToDeleteStudent = false;
    //                     this.toastrService.success(
    //                         `Delete intern "${nameStudent}" successfully`
    //                     );

    //                     // Remove this student on student list
    //                     this.studentList = this.studentList.filter(
    //                         (student) => student.id !== studentId
    //                     );

    //                     // Reset student id to delete
    //                 },
    //                 error: () => {
    //                     this.isFetchingToDeleteStudent = false;
    //                     this.toastrService.error(
    //                         `Delete intern "${nameStudent}" failure`
    //                     );
    //                 },
    //             });
    //         },
    //     });
    // }

    handleAddInternSuccess(intern: InternDetail) {
        this.internList.unshift(intern);
    }

    handleUpdateIntern(intern: InternDetail) {
        this.router.navigate([`/interns/${intern.id}`], {
            queryParams: { edit: true },
        });
    }
}
