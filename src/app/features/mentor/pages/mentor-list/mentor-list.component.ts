import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ColListData } from '@shared/components/list-data/list-data.model';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Mentor, MentorDetail } from '../../models/mentor.model';
import { MentorService } from '../../services/mentor.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PageInfo } from '@shared/model/common';

@Component({
    selector: 'app-mentor-list',
    templateUrl: './mentor-list.component.html',
    styleUrls: ['./mentor-list.component.scss'],
    providers: [ConfirmationService, DialogService, MessageService],
})
export class MentorListComponent {
    constructor(
        private mentorService: MentorService,
        private messageService: MessageService,
        private route: Router,
        private confirmationService: ConfirmationService
    ) {}
    ref!: DynamicDialogRef;
    mentorList: MentorDetail[] = [];
    searchKeyword: string = '';
    isFetching = false;
    isDeleting = false;
    isAddDialog = false;
    totalRecords = 0;

    pagination: PageInfo = {
        limit: 10,
        page: 0,
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
            header: 'Interns',
            field: 'totalIntern',
        },
        {
            header: 'Teams',
            field: 'totalTeam',
        },
        {
            field: 'gender',
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
                this.totalRecords = response.totalElements;
            },
            error: () => {
                this.messageService.add({
                    severity: 'error',
                    detail: 'Get teacher list failed. Please try again later',
                });
            },
            complete: () => {
                this.isFetching = false;
            },
        });
    }

    handleSubmitSuccess(mentor: MentorDetail) {
        this.mentorList.unshift(mentor);
    }

    handleUpdateMentor(mentor: MentorDetail) {
        this.route.navigate([`/mentors/${mentor.id}`], {
            queryParams: {
                edit: true,
            },
        });
    }

    handleDeleteMentor(mentor: MentorDetail) {
        const { id, name } = mentor;
        this.confirmationService.confirm({
            header: 'Delete Mentor',
            message: 'Are you sure that you want to delete this intern?',
            icon: 'pi pi-exclamation-triangle',

            accept: () => {
                this.isDeleting = true;
                this.mentorService.deleteMentor(id).subscribe({
                    next: () => {
                        this.isDeleting = false;
                        this.messageService.add({
                            severity: 'success',
                            detail: `Mentor ${name} has been deleted successfully!`,
                        });
                    },
                    error: (error) => {
                        this.isDeleting = false;

                        this.messageService.add({
                            severity: 'error',
                            detail: `Mentor ${name} could not be deleted!.`,
                        });
                    },
                });
            },
        });
    }
}
