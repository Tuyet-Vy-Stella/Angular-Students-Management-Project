import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { SubjectService } from '../../services/technology.service';

@Component({
    selector: 'app-technology-create',
    templateUrl: './technology-create.component.html',
    styleUrls: ['./technology-create.component.scss'],
})
export class TechnologyCreateComponent implements OnInit {
    constructor(
        private fb: FormBuilder,
        private config: DynamicDialogConfig,
        private subjectService: SubjectService,
        private toast: ToastrService
    ) {}
    technologyForm: FormGroup = this.fb.group({
        name: this.fb.control('', [
            Validators.required,
            Validators.minLength(6),
        ]),
    });
    isFetchingToCreateOrUpdate = false;

    ngOnInit() {
        const technology = this.config?.data?.technology;
        if (technology) {
            this.technologyForm.setValue({
                name: technology.name,
            });
        }
    }

    handleSubmit() {
        const id = this.config?.data?.technology?.id;
        const nameInput = this.technologyForm.get('name')?.value;
        this.isFetchingToCreateOrUpdate = true;
        if (id) {
            //Update
            this.subjectService.updateSubject(id, nameInput).subscribe({
                next: (value) => {
                    this.toast.success('Update technology success');
                    this.isFetchingToCreateOrUpdate = false;
                },
                error: (err) => {
                    this.toast.error('Update technology failed');
                    this.isFetchingToCreateOrUpdate = false;
                },
            });
        } else {
            //Add
            this.subjectService.createSubject(nameInput).subscribe({
                next: (value) => {
                    this.toast.success('Create technology success');
                    this.isFetchingToCreateOrUpdate = false;
                },
                error: (err) => {
                    this.toast.error('Create technology failed');
                    this.isFetchingToCreateOrUpdate = false;
                },
            });
        }
    }
}
