import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
    ColListData,
    PaginationListData,
} from '@shared/components/list-data/list-data.model';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { Mentor } from '../../models/mentor.model';
import { MentorService } from '../../services/mentor.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
    selector: 'app-teacher-list',
    templateUrl: './mentor-list.component.html',
    styleUrls: ['./mentor-list.component.scss'],
    providers: [ConfirmationService, DialogService],
})
export class TeacherListComponent {
    constructor(
        private mentorService: MentorService,
        private toastrService: ToastrService,
        private route: Router,
        private confirmationService: ConfirmationService
    ) {}
    ref!: DynamicDialogRef;
    mentorList: Mentor[] = [];
    searchKeyword: string = '';
    isFetching = false;
    isDeleting = false;
    isAddDialog = false;

    pagination: PaginationListData = {
        limit: 10,
        page: 0,
        total: 10,
    };

    cols: ColListData[] = [
        {
            field: 'name',
            type: 'link',
            url: ['mentors', 'id'],
        },
        {
            field: 'email',
        },
        {
            field: 'phone',
        },
        {
            field: 'address',
        },
        {
            field: 'birthday',
            type: 'date',
        },
    ];

    ngOnInit() {
        this.fetchMentors();
    }

    fetchMentors() {
        this.isFetching = true;
        this.mentorService.getMentors().subscribe({
            next: (response) => {
                this.mentorList = response.content;
                this.pagination.total = response.totalElements;
            },
            error: () => {
                this.toastrService.error(
                    'Get teacher list failed. Please try again later'
                );
            },
            complete: () => {
                this.isFetching = false;
            },
        });
    }

    handleSubmitSuccess(mentor: Mentor) {
        this.mentorList.unshift(mentor);
    }

    handleUpdateMentor(mentor: Mentor) {
        this.route.navigate([`/mentors/${mentor.id}`]);
    }

    handleAddMentor() {}

    handleDeleteMentor(mentor: Mentor) {
        const { id, name } = mentor;
        this.confirmationService.confirm({
            header: 'Delete Mentor',
            message: 'Are you sure that you want to delete this intern?',
            icon: 'pi pi-exclamation-triangle',

            accept: () => {
                this.isDeleting = true;
                this.mentorService.deleteMentor(id).subscribe({
                    next: (response) => {
                        if (response) {
                            this.mentorList = this.mentorList.filter(
                                (teacher) => teacher.id !== id
                            );
                            this.toastrService.success(
                                `Mentor ${name} has been deleted successfully!`
                            );
                        }
                    },
                    error: (error) => {
                        this.isDeleting = false;
                        this.toastrService.error(
                            `Mentor ${name} could not be deleted!.`,
                            error.error.message || 'Please try again later'
                        );
                        console.log(error);
                    },
                    complete: () => {
                        this.isDeleting = false;
                    },
                });
            },
        });
    }
}
