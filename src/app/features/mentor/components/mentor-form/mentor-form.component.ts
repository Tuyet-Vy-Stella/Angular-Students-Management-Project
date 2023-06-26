import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Mentor } from '../../models/mentor.model';
import { MentorService } from '../../services/mentor.service';
import { GENDER_DROPDOWN } from '@shared/constants';

@Component({
    selector: 'app-mentor-form',
    templateUrl: './mentor-form.component.html',
    styleUrls: ['./mentor-form.component.scss'],
})
export class MentorFormComponent implements OnInit {
    constructor(
        private fb: FormBuilder,
        private mentorService: MentorService,
        private toastrService: ToastrService
    ) {}
    mentorForm!: FormGroup;
    isLoading = false;

    @Input() mentor?: Mentor;
    @Input() isDialog = false;
    @Output() onSubmitSuccess = new EventEmitter<Mentor>();

    genders = GENDER_DROPDOWN;

    ngOnInit(): void {
        this.mentorForm = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(6)]],
            gender: ['male', [Validators.required]],
            birthday: [null, [Validators.required]],
            address: ['', [Validators.required]],
            phone: [
                null,
                [Validators.required, Validators.pattern('[- +()0-9]+')],
            ],
            email: [
                null,
                [
                    Validators.required,
                    Validators.email,
                    Validators.minLength(6),
                ],
            ],
        });

        if (this.mentor) {
            const { name, gender, birthday, address, phone, email } =
                this.mentor;
            this.mentorForm.setValue({
                name,
                gender,
                birthday: new Date(birthday),
                address,
                phone,
                email,
            });
        }
    }

    handleSubmit() {
        this.isLoading = true;
        if (this.mentor) {
            this.mentorService
                .updateMentor(this.mentor.id, {
                    ...this.mentorForm.value,
                })
                .subscribe({
                    next: (response) => {
                        this.toastrService.success(
                            'Update mentor successfully'
                        );
                        this.onSubmitSuccess.emit(response);
                    },
                    error: () => {},
                    complete: () => {
                        this.isLoading = false;
                    },
                });
        } else {
            this.mentorService.createMentor(this.mentorForm.value).subscribe({
                next: (response) => {
                    this.onSubmitSuccess.emit(response);
                    this.toastrService.success('Create mentor successfully');
                    this.isLoading = false;
                },
                error: () => {
                    this.toastrService.error('Create mentor failed');
                    this.isLoading = false;
                },
            });
        }
    }
}
