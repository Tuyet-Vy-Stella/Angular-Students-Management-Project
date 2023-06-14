import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { TeacherService } from '../../services/mentor.service';
import { Teacher } from '../../models/mentor.model';
import { tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-mentor-detail',
    templateUrl: './mentor-detail.component.html',
    styleUrls: ['./mentor-detail.component.scss'],
})
export class MentorDetailComponent implements OnInit {
    constructor(
        private route: ActivatedRoute,
        private teacherService: TeacherService,
        private toastrService: ToastrService
    ) {}

    teacher!: Teacher;
    isFetching: boolean = false;
    items: MenuItem[] = [
        { label: 'Info', icon: 'pi pi-fw pi-home', id: 'info' },
        { label: 'Edit', icon: 'pi pi-fw pi-calendar', id: 'edit' },
    ];

    activeItem = this.items[0];

    handleActiveItemChange(item: MenuItem) {
        this.activeItem = item;
    }

    ngOnInit(): void {
        this.route.params.subscribe((params: Params) => {
            const id = +params['id'];
            if (!id) return;
            // Fetch teacher
            this.teacherService
                .getTeacherById(id)
                .pipe(
                    tap(() => {
                        this.isFetching = false;
                    })
                )
                .subscribe({
                    next: (response) => {
                        this.teacher = response;
                    },
                    error: (error) => {
                        this.toastrService.error(
                            'Get teacher failed. Please try again'
                        );
                    },
                });
        });
    }
}
