import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs';
import { MentorService } from '../../services/mentor.service';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { mentors } from '../../mentor.data';
import { MenuItem } from 'primeng/api';
import { Mentor } from '../../models/mentor.model';

@Component({
    selector: 'app-mentor-detail',
    templateUrl: './mentor-detail.component.html',
    styleUrls: ['./mentor-detail.component.scss'],
})
export class MentorDetailComponent implements OnInit {
    constructor(
        private route: ActivatedRoute,
        private mentorService: MentorService,
        private toastrService: ToastrService,
        private router: Router,
        private fb: FormBuilder
    ) {}

    mentorForm!: FormGroup;
    isFetchingToCreateOrUpdateTeacher = false;
    isFetchingToGet = false;
    createMode = false;
    mentorId!: string;
    mentor?: Mentor;

    items: MenuItem[] = [
        { label: 'Info', icon: 'pi pi-fw pi-home', id: 'info' },
        { label: 'Edit', icon: 'pi pi-fw pi-calendar', id: 'edit' },
    ];

    activeItem: MenuItem = this.items[0];

    ngOnInit(): void {
        this.mentorForm = this.fb.group({
            name: ['', [Validators.required, this.checkFieldEmpty]],
            gender: ['male', [Validators.required]],
            birthday: [null, [Validators.required]],
            address: ['', [Validators.required, this.checkFieldEmpty]],
            phone: [
                null,
                [Validators.required, Validators.pattern('[- +()0-9]+')],
            ],
            email: [null, [Validators.required, Validators.email]],
        });

        this.fetchMentor();

        this.createMode = this.router.url.includes('create');
    }

    fetchMentor() {
        this.route.params.subscribe((params: Params) => {
            const id = params['id'];
            if (!id) {
                this.isFetchingToGet = false;
                return;
            }
            this.mentorId = id;
            this.isFetchingToGet = true;
            this.mentor = mentors.find((mentor) => mentor.id === id);
            this.mentorForm.patchValue({
                ...this.mentor,
            });
            this.isFetchingToGet = false;
            // this.mentorService
            //     .getMentorById(id)
            //     .pipe(
            //         tap(() => {
            //             this.isFetchingToGet = false;
            //         })
            //     )
            //     .subscribe({
            //         next: (response) => {
            //             const { id, ...rest } = response;
            //             this.mentorForm.patchValue({
            //                 ...rest,
            //             });
            //         },
            //         error: () => {
            //             this.toastrService.error(
            //                 'Get teacher failed. Please try again'
            //             );
            //         },
            //     });
        });
    }

    checkFieldEmpty(
        formControl: FormControl
    ): { [key: string]: boolean } | null {
        if (typeof formControl.value === 'string') {
            return formControl.value.toString().trim() ? null : { empty: true };
        }
        return null;
    }

    handleSubmit() {
        this.isFetchingToCreateOrUpdateTeacher = true;
        if (this.mentorId) {
            // Update teacher
            this.mentorService
                .updateMentor(this.mentorId, {
                    ...this.mentorForm.value,
                })
                .subscribe({
                    next: () => {
                        this.isFetchingToCreateOrUpdateTeacher = false;
                        this.toastrService.success(
                            'Update teacher successfully'
                        );
                        this.router.navigate(['/mentors']);
                    },
                    error: () => {
                        this.isFetchingToCreateOrUpdateTeacher = false;
                    },
                    complete: () => {
                        this.isFetchingToCreateOrUpdateTeacher = false;
                    },
                });
        } else {
            if (!this.createMode) return;
            // Create teacher
            this.mentorService
                .createTeacher({
                    ...this.mentorForm.value,
                })
                .subscribe({
                    next: () => {
                        this.isFetchingToCreateOrUpdateTeacher = false;
                        // Show alert
                        this.toastrService.success(
                            'Create mentor successfully'
                        );
                        // Reset form
                        this.mentorForm.reset();
                    },
                    error: () => {
                        this.isFetchingToCreateOrUpdateTeacher = false;
                        this.toastrService.error(
                            'Create mentor failed. Please try again'
                        );
                    },
                    complete: () => {
                        this.isFetchingToCreateOrUpdateTeacher = false;
                    },
                });
        }
    }
}
