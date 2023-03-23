import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { SubjectService } from '../service/subject.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-subject-edit',
  templateUrl: './subject-edit.component.html',
  styleUrls: ['./subject-edit.component.scss']
})
export class SubjectEditComponent implements OnInit, OnChanges {
  name:string = '';
  id:number = 0;

  constructor(private SubjectService: SubjectService, private route: ActivatedRoute, private router: Router,  private title: Title){}

  ngOnInit () {
    this.name =  this.SubjectService.getNameEdit();
    this.title.setTitle(`Edit - ${this.name}`)
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });


  }


  UpdateSubject(name:string){
    if(name == ''){
      alert('Please fill out input value.')
    }else{

      this.SubjectService.updateSubject(this.id, name).subscribe(res => {
        alert('Update is successful, the site will return to the previous page.');
        this.router.navigate(['/subjects']);
      })
    }

  }

  ngOnChanges(changes: SimpleChanges): void {
   
  }
}
