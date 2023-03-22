import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { SubjectService } from 'src/app/subject/service/subject.service';

@Component({
  selector: 'app-subject-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.scss']
})
export class SubjectListComponent implements OnInit {
  subjectList:any[] = [];
  name:string = '';
  nameSearchText:string = '';
  id:any = '';
  @ViewChild('createInput') inputEl!: ElementRef;

  //Focus Input
  FocusInput(){
    this.inputEl.nativeElement.focus();
  }
  
  constructor(private SubjectService: SubjectService){}

  ngOnInit() {
    this.SubjectService.getListSubject().subscribe(res => {
      this.subjectList = res;
      
    })
  }

  handleCreate(name:string){
    this.SubjectService.createSubject(name).subscribe(res => {
        this.subjectList = [...this.subjectList, res];
        
    })


  }

  /* Filter by Id */
  handleFilter(id:number){
    if(this.id === '' ) {
      this.SubjectService.getListSubject().subscribe(res => {
        this.subjectList = res;
        
        
      }) 
    }
    this.SubjectService.getSubjectById(id).subscribe(res => {
      this.subjectList = [res];
      
    })
  }

  /* Filter by Name */
  handleFilterByName(name:string){
    this.SubjectService.getListSubject().subscribe(res => {
      this.subjectList = res.filter((s:any) => {
        return s.name.toLowerCase().includes(name.toLowerCase())
         })

    })
    
  }

  handleUpdate(name:string){
      this.SubjectService.setNameEdit(name);
  }

  onSelect(event: any) {
    const selectedValue = event.target.value;
    if(selectedValue === 'All'){
      this.SubjectService.getListSubject().subscribe(res => {
       this.subjectList = res
       
        
      })
    }

    // Do something when 5 is selected
    if (selectedValue === '5') {
      this.SubjectService.getListSubject().subscribe(res => {
       this.subjectList = res.slice(0,5)
       
        
      })
      

    // Do something when 10 is selected
    } else if (selectedValue === '10') {
      this.SubjectService.getListSubject().subscribe(res => {
       this.subjectList = res.slice(0,10)
       
        
      })      
      // Do something else when 15 is selected
    } else if (selectedValue === '15') {
      this.SubjectService.getListSubject().subscribe(res => {
       this.subjectList = res.slice(0,15)
       
        
      })      
   
  }
  }

 
}
