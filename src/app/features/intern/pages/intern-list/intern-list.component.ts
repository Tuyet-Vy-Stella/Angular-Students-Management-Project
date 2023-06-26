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
import { Intern } from '../../models/intern.model';
import { InternService } from '../../services/intern.service';
import { Router } from '@angular/router';
import {
    ColListData,
    PaginationListData,
} from '@shared/components/list-data/list-data.model';

@Component({
    selector: 'app-student-list',
    templateUrl: './intern-list.component.html',
    styleUrls: ['./intern-list.component.scss'],
    providers: [ConfirmationService, DialogService],
})
export class InternListComponent {
    constructor(
        private internService: InternService,
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

    internList!: Intern[];
    isFetching = false;
    isDeleting = false;
    isAddDialog = false;

    ref!: DynamicDialogRef;

    pagination: PaginationListData = {
        total: 0,
        limit: 10,
        page: 0,
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
            type: 'status'
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
                    this.internList = response.content;
                    this.isFetching = false;
                    this.pagination.total = response.totalElements;
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

    handleAddInternSuccess(intern: Intern) {
        this.internList.unshift(intern);
    }

    handleUpdateIntern(intern: Intern) {
        this.router.navigate([`/interns/${intern.id}`], {
            queryParams: { edit: true },
        });
    }
}
