import {
    Component,
    ElementRef,
    OnChanges,
    OnInit,
    SimpleChanges,
    ViewChild,
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from '../../models/technology.model';
import { SubjectService } from '../../services/technology.service';

@Component({
    selector: 'app-subject-list',
    templateUrl: './technology-list.component.html',
    styleUrls: ['./technology-list.component.scss'],
})
export class SubjectListComponent implements OnInit, OnChanges {
    subjectList: any[] = [];
    name: string = '';
    nameSearchText: string = '';
    id: any = '';
    isLoading: boolean = false;
    isCreate: boolean = false;
    isSearch: boolean = false;
    newId: number = 0;
    newName: string = '';
    object: Object = {};
    isShowModal: boolean = false;
    isDelete: boolean = false;
    subjectId: number = 0;

    @ViewChild('createInput') inputEl!: ElementRef;
    @ViewChild('myTable') myTable: any;

    //Focus Input
    FocusInput() {
        this.inputEl.nativeElement.focus();
    }

    constructor(
        private SubjectService: SubjectService,
        private title: Title,
        private ToastService: ToastrService,
        private router: Router
    ) {}

    getListSubject() {
        this.SubjectService.getListSubject().subscribe((res) => {
            this.subjectList = res;
        });
    }
    ngOnInit() {
        this.title.setTitle('Subject List');
        this.isLoading = true;
        this.getListSubject();
    }

    /* Handle if not found */
    handleList() {
        if (this.id === '' && this.nameSearchText === '') {
            this.getListSubject();
        }
    }

    /* Handle Create */
    handleCreate(name: string) {
        this.isCreate = true;
        if (name == '') {
            this.ToastService.error('Please fill out input value.');
        } else {
            setTimeout(() => {
                this.isCreate = false;
            }, 2000);
            this.ToastService.success('Create is successfully.');
            this.SubjectService.createSubject(name).subscribe((res: any) => {
                this.subjectList = [
                    ...this.subjectList,
                    { name: name, id: res.id },
                ];
                this.name = '';
            });
        }
    }

    /* Show Model to choice Delete or not */
    handleDelete(id: number) {
        this.isShowModal = true;
        this.subjectId = id;
    }

    /* Close Modal */
    handleCloseModal() {
        this.isShowModal = false;
        this.ToastService.info('Denied Delete Subject.');
    }

    /* Delete Subject and Close Modal */
    handleDeleteStudent() {
        this.isShowModal = false;
        this.SubjectService.deleteSubject(this.subjectId).subscribe((res) => {
            this.ToastService.success(
                `Delete Subject With Id ${this.subjectId} Successfully.`
            );
            this.getListSubject();
        });
    }

    /* Filter by Id */
    /*   handleFilter(id: number) {
      if (this.id === '') {
        this.SubjectService.getListSubject().subscribe(res => {
          this.subjectList = res;
        })


      }
      else {

        this.SubjectService.getSubjectById(id).subscribe(res => {
          this.subjectList = [res];

        })
      }



    } */

    /* Filter by Name */
    /*   handleFilterByName(name: string) {
      if (name !== '' && this.id !== '') {
        this.SubjectService.getListSubject().subscribe(res => {
          this.subjectList = res.filter((s: any) => {
            return s.name.toLowerCase().includes(name.toLowerCase()) && s.id == this.id
          })

        })
      } else {

        this.SubjectService.getListSubject().subscribe(res => {
          this.subjectList = res.filter((s: any) => {
            return s.name.toLowerCase().includes(name.toLowerCase())
          })

        })
      }

    } */

    handleUpdate(name: string) {
        this.SubjectService.setNameEdit(name);
    }

    /* Handle Search */
    handleSearch() {
        this.isSearch = true;
        this.isLoading = false;
        /* Handle search if input value of id and value of name not empty */
        if (this.id.length !== 0 && this.nameSearchText.length !== 0) {
            this.SubjectService.getListSubject().subscribe((res) => {
                this.subjectList = res.filter(
                    (sub: Subject) =>
                        sub.id === +this.id &&
                        sub.name
                            .toLowerCase()
                            .includes(this.nameSearchText.toLowerCase())
                );
            });
        }

        /* Handle search if input value of id not empty and name is empty */
        if (this.id.length !== 0 && this.nameSearchText.length === 0) {
            this.SubjectService.getListSubject().subscribe((res) => {
                this.subjectList = res.filter(
                    (sub: Subject) => sub.id === +this.id
                );
            });
        }

        /* Handle search if input value of id is empty and name is not empty */
        if (this.id.length === 0 && this.nameSearchText.length !== 0) {
            this.SubjectService.getListSubject().subscribe((res) => {
                this.subjectList = res.filter((sub: Subject) =>
                    sub.name
                        .toLowerCase()
                        .includes(this.nameSearchText.toLowerCase())
                );
            });
        }
    }

    /* Handle Search */

    onSelect(event: any) {
        this.id = '';
        this.nameSearchText = '';
        this.name = '';
        const selectedValue = event.target.value;
        if (selectedValue === 'All') {
            this.getListSubject();
        } else {
            this.SubjectService.getListSubject().subscribe((res) => {
                this.subjectList = res.slice(0, +selectedValue);
            });
        }
    }

    ngOnChanges(changes: SimpleChanges): void {}
}
