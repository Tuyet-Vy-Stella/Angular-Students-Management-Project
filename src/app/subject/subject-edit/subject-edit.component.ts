import { Component, OnInit } from '@angular/core';
import { SubjectService } from '../service/subject.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-subject-edit',
  templateUrl: './subject-edit.component.html',
  styleUrls: ['./subject-edit.component.scss']
})
export class SubjectEditComponent implements OnInit {
  name:string = '';
  id:number = 0;

  constructor(private SubjectService: SubjectService, private route: ActivatedRoute){}

  ngOnInit () {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.id = id;
    });

    this.name =  this.SubjectService.getNameEdit()

  }


  UpdateSubject(name:string){
    this.SubjectService.updateSubject(this.id, name).subscribe(res => {
      console.log(res);
      
    })
  }
}
