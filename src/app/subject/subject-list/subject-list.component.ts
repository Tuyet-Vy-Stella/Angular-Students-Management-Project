import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { SubjectService } from 'src/app/subject/service/subject.service';

@Component({
  selector: 'app-subject-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.scss']
})
export class SubjectListComponent implements OnInit {
  subjectList: any[] = [];
  name: string = '';
  nameSearchText: string = '';
  id: any = '';
  @ViewChild('createInput') inputEl!: ElementRef;

  //Focus Input
  FocusInput() {
    this.inputEl.nativeElement.focus();
  }

  constructor(private SubjectService: SubjectService, private title: Title) { }

  ngOnInit() {
    this.title.setTitle('Subject List')
    this.SubjectService.getListSubject().subscribe(res => {
      this.subjectList = res;
    })
  }

  /* Handle Create */
  handleCreate(name: string) {
    if (name == '') {
      alert('Please fill out input value.');
    } else {
      this.SubjectService.createSubject(name).subscribe(res => {
        this.subjectList = [...this.subjectList, res];

      })

    }



  }

  /* Filter by Id */
  handleFilter(id: number) {
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



  }

  /* Filter by Name */
  handleFilterByName(name: string) {
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

  }

  handleUpdate(name: string) {
    this.SubjectService.setNameEdit(name);
  }

  onSelect(event: any) {
    const selectedValue = event.target.value;
    if (selectedValue === 'All') {
      this.SubjectService.getListSubject().subscribe(res => {
        this.subjectList = res;


      })
    } else {
      this.SubjectService.getListSubject().subscribe(res => {
        this.subjectList = res.slice(0, +selectedValue);


      })
    }


  }


}
