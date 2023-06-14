import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SubjectService } from '../../services/technology.service';

@Component({
    selector: 'app-subject-list',
    templateUrl: './technology-list.component.html',
    styleUrls: ['./technology-list.component.scss'],
})
export class SubjectListComponent implements OnInit {
    subjectList: any[] = [];
    isLoading: boolean = false;

    isDelete: boolean = false;

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
            field: 'created_at',
            header: 'Created Date',
        },
    ];

    constructor(
        private SubjectService: SubjectService,
        private title: Title,
        private ToastService: ToastrService,
        private router: Router
    ) {}

    getListSubject() {
        this.SubjectService.getListSubject().subscribe((res) => {
            this.subjectList = res;
            this.isLoading = false;
        });
    }
    ngOnInit() {
        this.title.setTitle('Subject List');
        this.isLoading = true;
        this.getListSubject();
    }

    /* Handle Create */
    handleCreate(name: string) {
        if (name == '') {
            this.ToastService.error('Please fill out input value.');
        } else {
            setTimeout(() => {}, 2000);
            this.ToastService.success('Create is successfully.');
            this.SubjectService.createSubject(name).subscribe((res: any) => {
                this.subjectList = [
                    ...this.subjectList,
                    { name: name, id: res.id },
                ];
            });
        }
    }

    /* Show Model to choice Delete or not */
    handleDelete(id: number) {}

    /* Close Modal */

    /* Delete Subject and Close Modal */
    handleDeleteStudent() {
        // this.SubjectService.deleteSubject(this.subjectId).subscribe((res) => {
        //     this.ToastService.success(
        //         `Delete Subject With Id ${this.subjectId} Successfully.`
        //     );
        //     this.getListSubject();
        // });
    }

    /* Handle Search */

    /* Handle Search */
}
