import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SubjectService } from '../../services/technology.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TechnologyCreateComponent } from '../../components';
import { Subject } from '../../models/technology.model';
import { ConfirmationService } from 'primeng/api';

@Component({
    selector: 'app-subject-list',
    templateUrl: './technology-list.component.html',
    styleUrls: ['./technology-list.component.scss'],
    providers: [DialogService, ConfirmationService],
})
export class SubjectListComponent implements OnInit {
    constructor(
        private subjectService: SubjectService,
        private title: Title,
        private toastrService: ToastrService,
        private router: Router,
        private dialogService: DialogService,
        private confirmationService: ConfirmationService
    ) {}
    subjectList: any[] = [];
    isLoading: boolean = false;
    isDeleting: boolean = false;
    ref!: DynamicDialogRef;

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
            date: true,
        },
    ];

    getListSubject() {
        this.subjectService.getListSubject().subscribe((res) => {
            this.subjectList = res;
            this.isLoading = false;
        });
    }
    ngOnInit() {
        this.isLoading = true;
        this.getListSubject();
    }

    /* Handle Create */

    handleAddTechnology() {
        this.ref = this.dialogService.open(TechnologyCreateComponent, {
            header: 'Add Technology',
            width: '40%',
            contentStyle: { overflow: 'auto' },
            baseZIndex: 10000,
            maximizable: true,
        });
    }

    handleUpdateTechnology(technology: Subject) {
        this.ref = this.dialogService.open(TechnologyCreateComponent, {
            header: 'Edit Technology',
            width: '40%',
            contentStyle: { overflow: 'auto' },
            baseZIndex: 10000,
            maximizable: true,
            data: {
                technology,
            },
        });
    }

    /* Show Model to choice Delete or not */
    handleDeleteTechnology(technology: Subject) {
        const { id, name } = technology;
        this.confirmationService.confirm({
            header: 'Delete Technology',
            message: 'Are you sure that you want to delete this technology?',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.isDeleting = true;

                // Listen fetch event
                this.subjectService.deleteSubject(id).subscribe({
                    next: () => {
                        this.isDeleting = false;
                        this.toastrService.success(
                            `Delete technology "${name}" successfully`
                        );

                        // Remove this student on student list
                        this.subjectList = this.subjectList.filter(
                            (technology) => technology.id !== id
                        );

                        // Reset student id to delete
                    },
                    error: () => {
                        this.isDeleting = false;
                        this.toastrService.error(
                            `Delete technology "${name}" failure`
                        );
                    },
                });
            },
        });
    }
}
