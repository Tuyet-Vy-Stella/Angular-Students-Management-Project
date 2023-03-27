import {
  Component,
  ElementRef,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subject } from 'src/app/shared/model/subject.model';
import { SubjectService } from 'src/app/subject/data-access/subject.service';

@Component({
  selector: 'app-subject-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.scss'],
})
export class SubjectListComponent implements OnInit, OnChanges {
  subjectList: Subject[] = [];
  name: string = '';
  nameSearchText: string = '';
  id: any = '';
  @ViewChild('createInput') inputEl!: ElementRef;

  //Focus Input
  FocusInput() {
    this.inputEl.nativeElement.focus();
  }

  constructor(private SubjectService: SubjectService, private title: Title) {}

  ngOnInit() {
    this.title.setTitle('Subject List');
    this.SubjectService.getListSubject().subscribe((res) => {
      this.subjectList = res;
    });
  }

  /* Handle if not found */
  handleList() {
    if (this.id === '' && this.nameSearchText === '') {
      this.SubjectService.getListSubject().subscribe((res) => {
        this.subjectList = res;
      });
    }
  }

  /* Handle Create */
  handleCreate(name: string) {
    if (name == '') {
      alert('Please fill out input value.');
    } else {
      alert('Create is successfull.');
      this.SubjectService.createSubject(name).subscribe((res) => {
        this.subjectList = [...this.subjectList, { name: name }];
      });
    }
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
    /* Handle search if input value of id and value of name not empty */
    if (this.id.length !== 0 && this.nameSearchText.length !== 0) {
      this.SubjectService.getListSubject().subscribe((res) => {
        this.subjectList = res.filter(
          (sub: Subject) =>
            sub.id === +this.id &&
            sub.name.toLowerCase().includes(this.nameSearchText.toLowerCase())
        );
      });
    }

    /* Handle search if input value of id not empty and name is empty */
    if (this.id.length !== 0 && this.nameSearchText.length === 0) {
      this.SubjectService.getListSubject().subscribe((res) => {
        this.subjectList = res.filter((sub: Subject) => sub.id === +this.id);
      });
    }

    /* Handle search if input value of id is empty and name is not empty */
    if (this.id.length === 0 && this.nameSearchText.length !== 0) {
      this.SubjectService.getListSubject().subscribe((res) => {
        this.subjectList = res.filter((sub: Subject) =>
          sub.name.toLowerCase().includes(this.nameSearchText.toLowerCase())
        );
      });
    }
  }

  /* Handle Search */

  onSelect(event: any) {
    const selectedValue = event.target.value;
    if (selectedValue === 'All') {
      this.SubjectService.getListSubject().subscribe((res) => {
        this.subjectList = res;
      });
    } else {
      this.SubjectService.getListSubject().subscribe((res) => {
        this.subjectList = res.slice(0, +selectedValue);
      });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {}
}