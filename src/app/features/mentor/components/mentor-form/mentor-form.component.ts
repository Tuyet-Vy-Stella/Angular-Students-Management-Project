import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Mentor, MentorDetail } from '../../models/mentor.model';
import { MentorService } from '../../services/mentor.service';
import { GENDER_DROPDOWN } from '@shared/constants';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-mentor-form',
    templateUrl: './mentor-form.component.html',
    styleUrls: ['./mentor-form.component.scss'],
    providers: [MessageService],
})
export class MentorFormComponent implements OnInit {
    constructor(
        private fb: FormBuilder,
        private mentorService: MentorService,
        private messageService: MessageService
    ) {}
    mentorForm!: FormGroup;
    isLoading = false;

    @Input() mentor?: MentorDetail;
    @Input() isDialog = false;
    @Output() onSubmitSuccess = new EventEmitter<MentorDetail>();

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
                        this.isLoading = false;
                        this.messageService.add({
                            severity: 'success',
                            detail: 'Update mentor successfully',
                        });
                        this.onSubmitSuccess.emit(response);
                    },
                    error: () => {
                        this.messageService.add({
                            severity: 'error',
                            detail: 'Update mentor failure',
                        });
                        this.isLoading = false;
                    },
                });
        } else {
            this.mentorService.createMentor(this.mentorForm.value).subscribe({
                next: (response) => {
                    this.mentorForm.reset();
                    this.onSubmitSuccess.emit(response);
                    this.messageService.add({
                        severity: 'success',
                        detail: 'Create mentor successfully',
                    });
                    this.isLoading = false;
                },
                error: () => {
                    this.messageService.add({
                        severity: 'error',
                        detail: 'Create mentor failure',
                    });
                    this.isLoading = false;
                },
            });
        }
    }
}
