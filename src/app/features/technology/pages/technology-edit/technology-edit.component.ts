import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { SubjectService } from '../../services/technology.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-subject-edit',
    templateUrl: './technology-edit.component.html',
    styleUrls: ['./technology-edit.component.scss'],
})
export class SubjectEditComponent implements OnInit, OnChanges {
    name: string = '';
    id: number = 0;

    constructor(
        private SubjectService: SubjectService,
        private route: ActivatedRoute,
        private router: Router,
        private title: Title,
        private toastService: ToastrService
    ) {}

    ngOnInit() {
        this.name = this.SubjectService.getNameEdit();
        this.title.setTitle(`Edit - ${this.name}`);
        this.route.params.subscribe((params) => {
            this.id = params['id'];
        });
    }

    UpdateSubject(name: string) {
        if (name == '') {
            this.toastService.error('Please fill out input value.');
        } else {
            this.SubjectService.updateSubject(this.id, name).subscribe(
                (res) => {
                    this.toastService.success(
                        'Update is successful, the site will return to the previous page.'
                    );
                    setTimeout(() => {
                        this.router.navigate(['/technologys']);
                    }, 2000);
                }
            );
        }
    }

    ngOnChanges(changes: SimpleChanges): void {}
}
