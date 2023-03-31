import { ThisReceiver } from '@angular/compiler';
import {
  Component,
  ElementRef,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'src/app/shared/model/subject.model';
import { SubjectService } from 'src/app/subject/data-access/subject.service';

@Component({
  selector: 'app-subject-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.scss'],
})
export class SubjectListComponent implements OnInit, OnChanges {
  subjectList: any[] = [];
  name: string = '';
  nameSearchText: string = '';
  id: any = '';
  isLoading: boolean = false;
  isCreate:boolean = false;
  isSearch:boolean = false;
  newId:number = 0;
  newName:string = '';
  object:Object = {};
  isShowModal:boolean = false;
  isDelete:boolean = false;
  subjectId:number = 0;

  @ViewChild('createInput') inputEl!: ElementRef;
  @ViewChild('myTable') myTable:any;

  //Focus Input
  FocusInput() {
    this.inputEl.nativeElement.focus();
  }

  constructor(
    private route: ActivatedRoute,
    private SubjectService: SubjectService,
    private title: Title,
    private ToastService: ToastrService,
    private router: Router,
    ) {

    }

  getListSubject(){
    this.SubjectService.getListSubject().subscribe((res) => {
      this.subjectList = res;
    });
  }
  ngOnInit() {
    this.title.setTitle('Subject List');
    this.isLoading = true;
    this.subjectList = this.route.snapshot.data['data']
    if(this.SubjectService.getUpdateStatus()){
      this.SubjectService.getListSubject().subscribe(res => {
        this.subjectList = res;
      })
    }
    /* this.getListSubject(); */
  }


  /* Handle if not found */
  handleList() {
    if (this.id === '' && this.nameSearchText === '') {
      this.subjectList = this.route.snapshot.data['data']

/*      this.getListSubject();
 */    }
  }

  /* Handle Create */
  handleCreate(name: string) {
    this.isCreate = true;
    if (name == '') {
      this.ToastService.error('Please fill out input value.');
      setTimeout(() => {
        this.isCreate = false;
      },2000)
    } else {
      setTimeout(() => {
        this.isCreate = false;
      },2000)
      this.ToastService.success('Create is successfully.');
      this.SubjectService.createSubject(name).subscribe((res:any) => {
        this.subjectList = [...this.subjectList, { name: name, id: res.id }];
        this.name = '';
      });



    }
  }


  /* Show Model to choice Delete or not */
  handleDelete(id:number){
    this.isShowModal = true;
    this.subjectId = id;
  }

  /* Close Modal */
  handleCloseModal(){
    this.isShowModal = false;
    this.ToastService.info('Denied Delete Subject.');
  }

  /* Delete Subject and Close Modal */
  handleDeleteSubject(){
    this.isShowModal =  false;
    this.SubjectService.deleteSubject(this.subjectId).subscribe(() => {
      this.SubjectService.getListSubject().subscribe(res => {
        this.subjectList = res;
      })
      this.ToastService.success(`Delete Subject With Id ${this.subjectId} Successfully.`);
     /*  this.getListSubject(); */
/*      this.subjectList = this.route.snapshot.data['data']
 */
    })
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
    this.isLoading =  false;
    /* Handle search if input value of id and value of name not empty */
    if (this.id.length !== 0 && this.nameSearchText.length !== 0) {
    /* use resolve */
    let subjectList:Subject[] =  this.subjectList = this.route.snapshot.data['data']
    
      this.subjectList = subjectList.filter(
        (sub: Subject) =>
          sub.id === +this.id &&
          sub.name.toLowerCase().includes(this.nameSearchText.toLowerCase())
      );
    

    /*   this.SubjectService.getListSubject().subscribe((res) => {
        this.subjectList = res.filter(
          (sub: Subject) =>
            sub.id === +this.id &&
            sub.name.toLowerCase().includes(this.nameSearchText.toLowerCase())
        );
      }); */
    }

    /* Handle search if input value of id not empty and name is empty */
    if (this.id.length !== 0 && this.nameSearchText.length === 0) {
      /* use resolve */
      let subjectList:Subject[] =  this.subjectList = this.route.snapshot.data['data']
      this.subjectList = subjectList.filter((sub: Subject) => sub.id === +this.id);


      /* this.SubjectService.getListSubject().subscribe((res) => {
        this.subjectList = res.filter((sub: Subject) => sub.id === +this.id);
      }); */
    }

    /* Handle search if input value of id is empty and name is not empty */
    if (this.id.length === 0 && this.nameSearchText.length !== 0) {
      /* Use Resolve */
      let subjectList:Subject[] =  this.subjectList = this.route.snapshot.data['data']

        this.subjectList = subjectList.filter((sub: Subject) =>
          sub.name.toLowerCase().includes(this.nameSearchText.toLowerCase())
        );
      
    
       
      /* this.SubjectService.getListSubject().subscribe((res) => {
        this.subjectList = res.filter((sub: Subject) =>
          sub.name.toLowerCase().includes(this.nameSearchText.toLowerCase())
        );
      }); */
    }
  }

  /* Handle Search */

  onSelect(event: any) {
    this.id = '';
    this.nameSearchText = '';
    this.name = '';
    const selectedValue = event.target.value;
    if (selectedValue === 'All') {
    /*  this.getListSubject(); */
    this.subjectList = this.route.snapshot.data['data']

    } else {
    /*   this.SubjectService.getListSubject().subscribe((res) => {
        this.subjectList = res.slice(0, +selectedValue);
      }); */

      /* Use Resolve */
      let subjectList:Subject[] =  this.subjectList = this.route.snapshot.data['data']
        this.subjectList = subjectList.slice(0, +selectedValue);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {}
}
