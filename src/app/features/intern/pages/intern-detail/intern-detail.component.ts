import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Student } from '../../models/intern.model';
import { StudentService } from '../../services/intern.service';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-student-detail',
    templateUrl: './intern-detail.component.html',
    styleUrls: ['./intern-detail.component.scss'],
})
export class StudentDetailComponent {
    items: MenuItem[] = [
        { label: 'Info', icon: 'pi pi-fw pi-home', id: 'info' },
        { label: 'Edit', icon: 'pi pi-fw pi-calendar', id: 'edit' },
    ];

    activeItem!: MenuItem;

    student!: Student;

    constructor(
        private studentService: StudentService,
        private route: ActivatedRoute,

    ) {}

    ngOnInit() {
        this.route.params.pipe().subscribe((params: Params) => {
            const id = +params['id'];
            if (Number.isInteger(id)) {
                this.studentService.getStudentById(id).subscribe((response) => {
                    response && (this.student = response);
                });
            }
        });

        this.route.queryParams.subscribe((queryParams) => {
            const edit = queryParams['edit'];
            if (edit) {
                this.activeItem = this.items[1];
            } else {
                this.activeItem = this.items[0];
            }
        });
    }

    handleActiveItemChange(event: MenuItem) {
        this.activeItem = event;
    }
}
