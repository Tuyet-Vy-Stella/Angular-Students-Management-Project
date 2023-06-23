import { Component } from '@angular/core';
import { Mentor } from '../../models/mentor.model';
import { MentorService } from '../../services/mentor.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { ConfirmationService } from 'primeng/api';
import {mentors} from '../../mentor.data'

@Component({
    selector: 'app-teacher-list',
    templateUrl: './mentor-list.component.html',
    styleUrls: ['./mentor-list.component.scss'],
    providers: [ConfirmationService],
})
export class TeacherListComponent {
    constructor(
        private mentorService: MentorService,
        private toastrService: ToastrService,
        private route: Router,
        private confirmationService: ConfirmationService
    ) {}

    mentorList: Mentor[] = [];
    searchKeyword: string = '';
    isLoading = false;
    teacherIdToDelete: number = 0;
    mentors: Mentor[] = mentors;
    rows=10;


    ngOnInit() {
        // this.fetchMentors();
    }

    fetchMentors() {
        this.isLoading = true;
        this.mentorService
            .getMentors()
            .pipe(
                tap(() => {
                    this.isLoading = false;
                })
            )
            .subscribe({
                next: (response) => {
                    this.mentorList = response.content;
                },
                error: (error) => {
                    this.toastrService.error(
                        'Get teacher list failed. Please try again later'
                    );
                },
            });
    }

    handleUpdateMentor(mentor: Mentor) {
        this.route.navigate([`/mentors/${mentor.id}`]);
    }

    handleAddMentor() {
        this.route.navigate(['/mentors/create']);
    }

    x($e: any) {
        console.log($e)
    }

    handleDeleteMentor(mentor: Mentor) {
        const { id, name } = mentor;
        this.confirmationService.confirm({
            header: 'Delete Mentor',
            message: 'Are you sure that you want to delete this intern?',
            icon: 'pi pi-exclamation-triangle',

            accept: () => {
                this.isLoading = true;
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
