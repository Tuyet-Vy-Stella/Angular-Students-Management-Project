import { Component } from '@angular/core';
import { Teacher } from '../../models/mentor.model';
import { TeacherService } from '../../services/mentor.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-teacher-list',
    templateUrl: './mentor-list.component.html',
    styleUrls: ['./mentor-list.component.scss'],
})
export class TeacherListComponent {
    constructor(
        private teacherService: TeacherService,
        private toastrService: ToastrService
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
        this.isLoading = true;
        this.teacherService.getTeachers().subscribe({
            next: (response) => {
                if (response) {
                    // Update student list
                    this.teacherList = response;
                }
            },
            error: (error) => {
                this.isLoading = false;
                this.toastrService.error(
                    'Get teacher list failed. Please try again later'
                );
                console.log(error);
            },
            complete: () => {
                this.isLoading = false;
            },
        });
    }

    deleteTeacher(id = this.teacherIdToDelete) {
        const teacher_name = this.teacherList.find(
            (teacher) => teacher.id === id
        )?.name;

        this.isLoading = true;
        this.teacherService.deleteTeacher(id).subscribe({
            next: (response) => {
                if (response) {
                    this.teacherList = this.teacherList.filter(
                        (teacher) => teacher.id !== id
                    );
                    this.toastrService.success(
                        `Teacher ${teacher_name} has been deleted successfully!`
                    );
                }
            },
            error: (error) => {
                this.isLoading = false;
                this.toastrService.error(
                    `Teacher ${teacher_name} could not be deleted!.`,
                    error.error.message || 'Please try again later'
                );
                console.log(error);
            },
            complete: () => {
                this.isLoading = false;
            },
        });
    }
}
