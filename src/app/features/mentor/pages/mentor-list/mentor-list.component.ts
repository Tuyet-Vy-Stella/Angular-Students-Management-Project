import { Component } from '@angular/core';
import { Teacher } from '../../models/mentor.model';
import { TeacherService } from '../../services/mentor.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { ConfirmationService } from 'primeng/api';

@Component({
    selector: 'app-teacher-list',
    templateUrl: './mentor-list.component.html',
    styleUrls: ['./mentor-list.component.scss'],
    providers: [ConfirmationService],
})
export class TeacherListComponent {
    constructor(
        private teacherService: TeacherService,
        private toastrService: ToastrService,
        private route: Router,
        private confirmationService: ConfirmationService
    ) {}

    teacherList: Teacher[] = [];
    searchKeyword: string = '';
    isLoading = false;
    teacherIdToDelete: number = 0;

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
        {
            field: 'joined_date',
            header: 'Joined Date',
        },
    ];

    ngOnInit() {
        this.fetchMentors();
    }

    fetchMentors() {
        this.isLoading = true;
        this.teacherService
            .getTeachers()
            .pipe(
                tap(() => {
                    this.isLoading = false;
                })
            )
            .subscribe({
                next: (response) => {
                    this.teacherList = response;
                },
                error: (error) => {
                    this.toastrService.error(
                        'Get teacher list failed. Please try again later'
                    );
                },
            });
    }

    handleUpdateMentor(mentor: Teacher) {
        this.route.navigate([`/teachers/${mentor.id}`]);
    }

    handleAddMentor() {
        this.route.navigate(['/teachers/create']);
    }

    handleDeleteMentor(mentor: Teacher) {
        const { id, name } = mentor;
        this.confirmationService.confirm({
            header: 'Delete Mentor',
            message: 'Are you sure that you want to delete this intern?',
            icon: 'pi pi-exclamation-triangle',

            accept: () => {
                this.isLoading = true;
                this.teacherService.deleteTeacher(id).subscribe({
                    next: (response) => {
                        if (response) {
                            this.teacherList = this.teacherList.filter(
                                (teacher) => teacher.id !== id
                            );
                            this.toastrService.success(
                                `Mentor ${name} has been deleted successfully!`
                            );
                        }
                    },
                    error: (error) => {
                        this.isLoading = false;
                        this.toastrService.error(
                            `Mentor ${name} could not be deleted!.`,
                            error.error.message || 'Please try again later'
                        );
                        console.log(error);
                    },
                    complete: () => {
                        this.isLoading = false;
                    },
                });
            },
        });
    }
}
